from rest_framework.serializers import ModelSerializer, CharField

from product.models import Product
from .models import Cart, Client, OrderItem
from product.serializers import ProductSerializer


class OrderItemSerializer(ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['product', 'is_ordered', 'date_added', 'id']


class CartProductsSerializer(ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['items', 'id']


class ClientSerializer(ModelSerializer):
    cart = CartProductsSerializer()

    class Meta:
        model = Client
        fields = ['id', 'name', 'address', 'username', 'cart']


class ClientCreateSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'address', 'password', 'username']

    def create(self, validated_data):
        client = Client.objects.create(**validated_data)
        Cart.objects.create(client=client, id=client.pk)
        return client


class AddToCartSerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product']

    def to_internal_value(self, data):
        print(self.context.get('cart_id'))
        cart, status = Cart.objects.get_or_create(pk=self.context.get('cart_id'))
        print(cart)
        product = Product.objects.get(id=data.get('product'))
        print(cart)
        order_item = OrderItem.objects.create(product=product, cart=cart)
        print(order_item)
        return order_item


class DeleteItemFromCartSerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id']

    def to_internal_value(self, data):
        order_item = OrderItem.objects.filter(pk=self.context.get('item_id'))
        order_item.delete()
        return order_item
