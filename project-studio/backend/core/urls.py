from django.urls import path
from .views import SessionView,AuthView,ProductsView,OrdersView,NetworkView,JourneysView,MovementView,MovementDetailView,HealthView
urlpatterns=[
    path('health/',HealthView.as_view()),path('session/',SessionView.as_view()),
    path('auth/<str:action>/',AuthView.as_view()),path('products/',ProductsView.as_view()),
    path('orders/',OrdersView.as_view()),path('network/',NetworkView.as_view()),
    path('journeys/',JourneysView.as_view()),path('movement/',MovementView.as_view()),
    path('movement/<uuid:pk>/',MovementDetailView.as_view()),
]
