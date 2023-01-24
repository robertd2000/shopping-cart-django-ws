from django.contrib import admin

from .models import Product, Price, Type


class PriceInline(admin.TabularInline):
    model = Price


class ProductAdmin(admin.ModelAdmin):
    inlines = [PriceInline]


admin.site.register(Product, ProductAdmin)
admin.site.register(Type)
