from django.db import models


def upload_to(instance, filename):
    return f'images/{filename}'


class Type(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тип"
        verbose_name_plural = "Типы"
        ordering = ['id']


class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    remaining_stock = models.PositiveIntegerField(verbose_name='Остаток на складе', default=1)
    barcode = models.ImageField(upload_to=upload_to, blank=True, null=True, verbose_name='Штрихкод')
    image = models.ImageField(upload_to=upload_to, blank=True, null=True, verbose_name='Картинка товара')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')
    type = models.ForeignKey(Type, on_delete=models.CASCADE, verbose_name='Тип')
    supplier = models.CharField(max_length=255, verbose_name='Поставщик')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
        ordering = ['id']


class Price(models.Model):
    currency = models.CharField(max_length=255, verbose_name='Валюта')
    cost = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Стоимость')
    product = models.OneToOneField(Product, on_delete=models.CASCADE, verbose_name='Товар')

    def __str__(self):
        return f'{self.cost} {self.currency}'

    class Meta:
        verbose_name = "Цена"
        verbose_name_plural = "Цены"
        ordering = ['id']
