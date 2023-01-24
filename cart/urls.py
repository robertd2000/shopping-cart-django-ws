from django.urls import path
from .views import ClientView, CartView, OrderItemView

urlpatterns = [
    path('clients/<int:pk>/delete/<int:id>', OrderItemView.as_view(), name='client_cart'),
    path('clients/<int:pk>', CartView.as_view(), name='client_cart'),
    path('clients/', ClientView.as_view(), name='clients'),
]
