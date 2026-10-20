import json
from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction
from core.models import Product,Stop,Route,RouteStop

class Command(BaseCommand):
    help='Seed fictional catalog and transit data; preserve existing product stock and user records.'
    @transaction.atomic
    def handle(self,*args,**kwargs):
        shared=settings.BASE_DIR.parent/'shared'
        for product in json.loads((shared/'catalog.json').read_text()):
            ident=product.pop('id')
            Product.objects.get_or_create(id=ident,defaults=product)
        network=json.loads((shared/'transit.json').read_text())
        for stop in network['stops']:
            ident=stop.pop('id')
            Stop.objects.update_or_create(id=ident,defaults=stop)
        for route in network['routes']:
            ident=route.pop('id'); stops=route.pop('stops'); minutes=route.pop('minutes')
            record,_=Route.objects.update_or_create(id=ident,defaults=route)
            for position,(stop,minute) in enumerate(zip(stops,minutes)):
                RouteStop.objects.update_or_create(route=record,position=position,defaults={'stop_id':stop,'minute':minute})
            RouteStop.objects.filter(route=record,position__gte=len(stops)).delete()
        self.stdout.write(self.style.SUCCESS('Demo products and routes are ready. No user accounts were created.'))
