import uuid
from django.conf import settings
from django.db import models

class Product(models.Model):
    id = models.SlugField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=40)
    room = models.CharField(max_length=40)
    price = models.PositiveIntegerField(help_text='INR paise')
    stock = models.PositiveIntegerField(default=0)
    color = models.CharField(max_length=10)
    shape = models.CharField(max_length=20)
    dimensions = models.CharField(max_length=100)
    material = models.CharField(max_length=150)
    description = models.TextField()
    def __str__(self): return self.name

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    request_id = models.UUIDField()
    created_at = models.DateTimeField(auto_now_add=True)
    total = models.PositiveIntegerField()
    status = models.CharField(max_length=40, default='demo-confirmed')
    class Meta:
        constraints = [models.UniqueConstraint(fields=['user','request_id'],name='unique_order_request_per_user')]

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    name = models.CharField(max_length=100)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()

class Stop(models.Model):
    id = models.SlugField(primary_key=True)
    name = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    def __str__(self): return self.name

class Route(models.Model):
    id = models.CharField(primary_key=True,max_length=12)
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=10)
    headway = models.PositiveIntegerField()
    first = models.PositiveIntegerField()
    last = models.PositiveIntegerField()
    base_fare = models.PositiveIntegerField()
    per_stop = models.PositiveIntegerField()
    def __str__(self): return self.name

class RouteStop(models.Model):
    route = models.ForeignKey(Route,related_name='route_stops',on_delete=models.CASCADE)
    stop = models.ForeignKey(Stop,on_delete=models.PROTECT)
    position = models.PositiveIntegerField()
    minute = models.PositiveIntegerField()
    class Meta:
        ordering=['position']
        constraints=[models.UniqueConstraint(fields=['route','position'],name='unique_route_position')]

class MovementSession(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    kind = models.CharField(max_length=12,choices=[('recovery','Recovery'),('gait','Gait')])
    source = models.CharField(max_length=12,choices=[('simulation','Simulation'),('camera','Camera'),('video','Video')])
    exercise = models.CharField(max_length=80)
    duration = models.FloatField()
    reps = models.PositiveIntegerField(default=0)
    metrics = models.JSONField(default=dict)
    notes = models.CharField(max_length=500,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta: ordering=['-created_at']
