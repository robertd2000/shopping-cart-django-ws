from django.urls import path
from .views import ProductView, TypeView

urlpatterns = [
    path('', ProductView.as_view(), name='products'),
    path('types/', TypeView.as_view(), name='types'),
]
