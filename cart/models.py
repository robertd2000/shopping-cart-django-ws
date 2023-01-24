from django.contrib.auth.models import AbstractUser
from django.db import models

from product.models import Product


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name='Товар')
    is_ordered = models.BooleanField(default=False)
    date_added = models.DateTimeField(auto_now=True)
    date_ordered = models.DateTimeField(null=True)
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE, related_name='items')

    def __str__(self):
        return self.product.name


class Client(AbstractUser):
    name = models.CharField(max_length=255, verbose_name='Имя')
    address = models.TextField(verbose_name='Адрес')

    def get_cart(self):
        return self.cart.items.all()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Клиент"
        verbose_name_plural = "Клиенты"
        ordering = ['id']


class Cart(models.Model):
    client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='cart', verbose_name='Владелец')

    def __str__(self):
        return self.client.name

    class Meta:
        verbose_name = "Клиент/Корзина"
        verbose_name_plural = "Клиенты/Корзины"
        ordering = ['id']
