from django.contrib import admin
from .models import Cart, Client, OrderItem


class CartInline(admin.TabularInline):
    model = Cart


class ClientAdmin(admin.ModelAdmin):
    inlines = [
        CartInline,
    ]


admin.site.register(Client, ClientAdmin)
admin.site.register(OrderItem)
