import json
import uuid
from pathlib import Path
from django.test import TestCase,Client
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.core.cache import cache
from rest_framework.test import APIClient
from .models import Product,Order,MovementSession
from .routing import journeys
from .serializers import MovementSerializer

class SuiteTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command('seed_demo',verbosity=0)
        cls.a=get_user_model().objects.create_user('alice',password='River-Solid-482!')
        cls.b=get_user_model().objects.create_user('bruno',password='River-Solid-482!')
    def setUp(self):
        cache.clear()
        self.client=APIClient()
        self.client.force_authenticate(self.a)
    def test_checkout_price_is_server_computed_and_retry_is_idempotent(self):
        product=Product.objects.get(pk='chair-01');before=product.stock
        body={'items':[{'id':product.id,'quantity':2,'price':1}], 'request_id':str(uuid.uuid4()),'total':1}
        first=self.client.post('/api/orders/',body,format='json')
        self.assertEqual(first.status_code,201,first.data)
        self.assertEqual(first.data['total'],product.price*2)
        second=self.client.post('/api/orders/',body,format='json')
        self.assertEqual(first.data['id'],second.data['id'])
        self.assertEqual(Order.objects.count(),1)
        product.refresh_from_db();self.assertEqual(product.stock,before-2)
    def test_checkout_rejects_invalid_quantities_and_unavailable_stock(self):
        for quantity in [-1,0,1.2,21]:
            r=self.client.post('/api/orders/',{'items':[{'id':'chair-01','quantity':quantity}],'request_id':str(uuid.uuid4())},format='json')
            self.assertEqual(r.status_code,400)
        r=self.client.post('/api/orders/',{'items':[{'id':'chair-01','quantity':9}],'request_id':str(uuid.uuid4())},format='json')
        self.assertEqual(r.status_code,409);self.assertEqual(Order.objects.count(),0)
    def test_one_unavailable_item_does_not_decrement_other_items(self):
        before=Product.objects.get(pk='chair-01').stock
        r=self.client.post('/api/orders/',{'items':[{'id':'chair-01','quantity':1},{'id':'sofa-01','quantity':15}],'request_id':str(uuid.uuid4())},format='json')
        self.assertEqual(r.status_code,409)
        self.assertEqual(Product.objects.get(pk='chair-01').stock,before)
    def test_orders_are_private(self):
        self.client.post('/api/orders/',{'items':[{'id':'chair-01','quantity':1}],'request_id':str(uuid.uuid4())},format='json')
        self.client.force_authenticate(self.b)
        self.assertEqual(self.client.get('/api/orders/').data,[])
        self.client.force_authenticate(None)
        self.assertEqual(self.client.get('/api/orders/').status_code,403)
    def test_movement_records_are_private_and_only_owner_can_delete(self):
        body={'kind':'recovery','source':'simulation','exercise':'elbow-left','duration':12,'reps':3,'metrics':{'quality':100,'min_angle':40,'max_angle':170}}
        r=self.client.post('/api/movement/',body,format='json');self.assertEqual(r.status_code,201,r.data)
        pk=r.data['id'];self.client.force_authenticate(self.b)
        self.assertEqual(self.client.get('/api/movement/').data,[])
        self.assertEqual(self.client.delete('/api/movement/'+str(pk)+'/').status_code,404)
        self.client.force_authenticate(self.a)
        self.assertEqual(self.client.delete('/api/movement/'+str(pk)+'/').status_code,204)
        self.assertEqual(MovementSession.objects.count(),0)
    def test_nonfinite_metrics_unknown_fields_and_oversized_sessions_are_rejected(self):
        base={'kind':'gait','source':'camera','exercise':'side-view-walk','duration':12,'reps':4}
        for metrics in [{'cadence':float('nan')},{'raw_video':'data:video/binary'},{'quality':101}]:
            s=MovementSerializer(data={**base,'metrics':metrics});self.assertFalse(s.is_valid())
        s=MovementSerializer(data={**base,'duration':4000,'metrics':{}});self.assertFalse(s.is_valid())
    def test_timetable_handles_transfers_reverse_routes_and_no_service(self):
        network=json.loads((settings.BASE_DIR.parent/'shared/transit.json').read_text())
        result=journeys(network,'railway','mannuthy',480)
        self.assertTrue(result)
        for r in result:
            for a,b in zip(r['legs'],r['legs'][1:]):self.assertGreaterEqual(b['depart']-a['arrive'],5)
        self.assertTrue(any(not x['transfers'] for x in journeys(network,'viyyoor','railway',480)))
        self.assertEqual(journeys(network,'museum','railway',480),[])
        self.assertEqual(journeys(network,'railway','mannuthy',1439),[])
        self.assertEqual(self.client.get('/api/journeys/?from=railway&to=railway&depart=480').status_code,400)
    def test_api_requires_csrf_even_on_anonymous_login_and_register(self):
        client=Client(enforce_csrf_checks=True)
        details={'username':'alice','password':'River-Solid-482!'}
        self.assertEqual(client.post('/api/auth/login/',details,content_type='application/json').status_code,403)
        token=client.get('/api/session/').json()['csrf']
        r=client.post('/api/auth/login/',details,content_type='application/json',HTTP_X_CSRFTOKEN=token)
        self.assertEqual(r.status_code,200)
        self.assertEqual(client.get('/api/session/').json()['user']['username'],'alice')
    def test_seed_preserves_existing_stock(self):
        Product.objects.filter(pk='chair-01').update(stock=2)
        call_command('seed_demo',verbosity=0)
        self.assertEqual(Product.objects.get(pk='chair-01').stock,2)
    def test_health_and_production_frontend_fallback(self):
        self.assertEqual(self.client.get('/api/health/').status_code,200)
        self.assertEqual(self.client.get('/api/does-not-exist/').status_code,404)
