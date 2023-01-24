from rest_framework.serializers import ModelSerializer, ImageField
from .models import Type, Price, Product


class TypeSerializer(ModelSerializer):
    class Meta:
        model = Type
        fields = ['id', 'name', 'description']


class PriceSerializer(ModelSerializer):
    class Meta:
        model = Price
        fields = ['currency', 'cost']


class ProductSerializer(ModelSerializer):
    type = TypeSerializer()
    price = PriceSerializer()
    image = ImageField(required=False)

    class Meta:
        model = Product
        fields = ['id', 'name', 'remaining_stock', 'barcode', 'image', 'updated_at', 'type', 'supplier', 'price']


class ProductCreateSerializer(ModelSerializer):
    price = PriceSerializer()

    class Meta:
        model = Product
        fields = ['name', 'remaining_stock', 'barcode', 'image', 'supplier', 'price', 'type']

    def create(self, validated_data):
        validated_price = validated_data.pop('price')
        product = Product.objects.create(**validated_data)
        Price.objects.create(**validated_price, product=product)
        return product
