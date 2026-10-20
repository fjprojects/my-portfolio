from django.contrib import admin
from .models import Product, Stop, Route, RouteStop

class RouteStopInline(admin.TabularInline):
    model=RouteStop
    extra=0
@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    inlines=[RouteStopInline]
admin.site.register([Product,Stop])
