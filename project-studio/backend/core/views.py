import re
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import transaction, IntegrityError
from django.db.models import F
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import ScopedRateThrottle
from .models import Product, Order, OrderItem, Stop, Route, MovementSession
from .serializers import ProductSerializer, OrderSerializer, CheckoutSerializer, MovementSerializer
from .routing import journeys

@method_decorator(ensure_csrf_cookie,name='dispatch')
class SessionView(APIView):
    permission_classes=[AllowAny]
    def get(self,request):
        return Response({'user':{'username':request.user.username} if request.user.is_authenticated else None,'csrf':get_token(request)})

@method_decorator(csrf_protect,name='dispatch')
class AuthView(APIView):
    permission_classes=[AllowAny]
    throttle_classes=[ScopedRateThrottle]
    throttle_scope='auth'
    def post(self,request,action):
        if action not in ('register','login','logout'): return Response({'detail':'Unknown authentication action.'},status=404)
        if action=='logout':
            logout(request)
            return Response({'user':None,'csrf':get_token(request)})
        username=request.data.get('username','')
        password=request.data.get('password','')
        if not isinstance(username,str) or not re.fullmatch(r'[A-Za-z0-9_\-.]{3,40}',username) or not isinstance(password,str) or len(password)>128:
            return Response({'detail':'Use a 3–40 character username and a valid password.'},status=400)
        if action=='register':
            user=get_user_model()(username=username)
            try:
                validate_password(password,user)
                user.set_password(password)
                user.save()
            except ValidationError as exc: return Response({'detail':' '.join(exc.messages)},status=400)
            except IntegrityError: return Response({'detail':'That username is unavailable.'},status=400)
        else:
            user=authenticate(request,username=username,password=password)
            if not user: return Response({'detail':'Username or password is incorrect.'},status=400)
        login(request,user)
        return Response({'user':{'username':user.username},'csrf':get_token(request)})

class ProductsView(APIView):
    permission_classes=[AllowAny]
    def get(self,request): return Response(ProductSerializer(Product.objects.order_by('name'),many=True).data)

class OrdersView(APIView):
    def get(self,request): return Response(OrderSerializer(Order.objects.filter(user=request.user).prefetch_related('items').order_by('-created_at')[:100],many=True).data)
    def post(self,request):
        serializer=CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=serializer.validated_data
        try:
            with transaction.atomic():
                get_user_model().objects.select_for_update().get(pk=request.user.pk)
                existing=Order.objects.filter(user=request.user,request_id=data['request_id']).first()
                if existing: return Response(OrderSerializer(existing).data)
                products={p.id:p for p in Product.objects.select_for_update().filter(id__in=[i['id'] for i in data['items']]).order_by('id')}
                if len(products)!=len(data['items']): return Response({'detail':'One or more products no longer exist.'},status=400)
                for item in data['items']:
                    if products[item['id']].stock < item['quantity']: return Response({'detail':products[item['id']].name+' has insufficient stock.'},status=409)
                total=sum(products[i['id']].price*i['quantity'] for i in data['items'])
                order=Order.objects.create(user=request.user,request_id=data['request_id'],total=total)
                for item in data['items']:
                    product=products[item['id']]
                    changed=Product.objects.filter(pk=product.id,stock__gte=item['quantity']).update(stock=F('stock')-item['quantity'])
                    if not changed: raise ValueError('Stock changed; please refresh your cart.')
                    OrderItem.objects.create(order=order,product=product,name=product.name,price=product.price,quantity=item['quantity'])
                return Response(OrderSerializer(order).data,status=201)
        except ValueError as exc: return Response({'detail':str(exc)},status=409)
        except IntegrityError:
            existing=Order.objects.filter(user=request.user,request_id=data['request_id']).first()
            if existing: return Response(OrderSerializer(existing).data)
            return Response({'detail':'Could not place order. Please retry.'},status=409)

def get_network():
    routes=[]
    for route in Route.objects.prefetch_related('route_stops').order_by('id'):
        stops=list(route.route_stops.all())
        routes.append({key:getattr(route,key) for key in ['id','name','color','headway','first','last','base_fare','per_stop']}|{'stops':[s.stop_id for s in stops],'minutes':[s.minute for s in stops]})
    return {'notice':'Synthetic demonstration network. Not real transport information.','stops':list(Stop.objects.values('id','name','lat','lng')),'routes':routes}

class NetworkView(APIView):
    permission_classes=[AllowAny]
    def get(self,request): return Response(get_network())

class JourneysView(APIView):
    permission_classes=[AllowAny]
    def get(self,request):
        try:
            result=journeys(get_network(),request.query_params.get('from'),request.query_params.get('to'),int(request.query_params.get('depart','480')),request.query_params.get('sort','fastest'))
        except (ValueError,TypeError) as exc: return Response({'detail':str(exc)},status=400)
        return Response(result)

class MovementView(APIView):
    def get(self,request):
        data=MovementSession.objects.filter(user=request.user)
        if request.query_params.get('kind'): data=data.filter(kind=request.query_params['kind'])
        return Response(MovementSerializer(data[:200],many=True).data)
    def post(self,request):
        serializer=MovementSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data,status=201)

class MovementDetailView(APIView):
    def delete(self,request,pk):
        record=MovementSession.objects.filter(pk=pk,user=request.user).first()
        if record is None: return Response({'detail':'Session not found.'},status=404)
        record.delete()
        return Response(status=204)

class HealthView(APIView):
    permission_classes=[AllowAny]
    def get(self,request):
        from django.db import connection
        connection.ensure_connection()
        return Response({'status':'ok','service':'francis-project-suite'})
