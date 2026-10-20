import math
from rest_framework import serializers
from .models import Product, Order, OrderItem, MovementSession

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields=['product','name','price','quantity']

class OrderSerializer(serializers.ModelSerializer):
    items=OrderItemSerializer(many=True,read_only=True)
    class Meta:
        model=Order
        fields=['id','created_at','total','status','items']

class CheckoutItem(serializers.Serializer):
    id=serializers.SlugField()
    quantity=serializers.IntegerField(min_value=1,max_value=20)

class CheckoutSerializer(serializers.Serializer):
    request_id=serializers.UUIDField()
    items=CheckoutItem(many=True,allow_empty=False,max_length=30)
    def validate_items(self, items):
        ids=[x['id'] for x in items]
        if len(set(ids))!=len(ids): raise serializers.ValidationError('Combine duplicate products into one cart line.')
        return items

class MovementSerializer(serializers.ModelSerializer):
    duration=serializers.FloatField(min_value=1,max_value=3600)
    reps=serializers.IntegerField(min_value=0,max_value=10000)
    class Meta:
        model=MovementSession
        fields=['id','kind','source','exercise','duration','reps','metrics','notes','created_at']
        read_only_fields=['id','created_at']
    def validate_duration(self,value):
        if not math.isfinite(value): raise serializers.ValidationError('Duration must be finite.')
        return value
    def validate_metrics(self,value):
        limits={'min_angle':(0,180),'max_angle':(0,180),'quality':(0,100),'steps':(0,10000),'cadence':(0,500),'interval_symmetry':(0,100),'speed':(0,20),'distance':(0,1000),'pause_count':(0,1000),'min_target':(0,180),'max_target':(0,180)}
        if not isinstance(value,dict) or set(value)-set(limits): raise serializers.ValidationError('Unsupported metric keys.')
        for key,item in value.items():
            if item is None: continue
            if isinstance(item,bool) or not isinstance(item,(int,float)) or not math.isfinite(item) or not limits[key][0]<=item<=limits[key][1]: raise serializers.ValidationError('Invalid value for '+key)
        return value
