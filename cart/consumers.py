from channels.db import database_sync_to_async
from djangochannelsrestframework.decorators import action
from djangochannelsrestframework.observer import model_observer
from djangochannelsrestframework.observer.generics import ObserverModelInstanceMixin

from product.models import Product
from .models import Client, OrderItem, Cart
from .serializers import ClientSerializer, AddToCartSerializer
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    PatchModelMixin,
    UpdateModelMixin,
    CreateModelMixin,
    DeleteModelMixin,
)


class CartConsumer(
    ObserverModelInstanceMixin, GenericAsyncAPIConsumer
):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    @model_observer(Client, serializer_class=ClientSerializer)
    async def get_cart(self,
                       message: ClientSerializer,
                       observer=None,
                       **kwargs):
        await self.send_json({'hi': 'hi'})
        # await self.send_json(dict(message.data))

    @get_cart.serializer
    def get_cart_serializer(self, instance: Client, action, **kwargs):
        # cart = await self.get_client_from_db(kwargs.get('pk'))
        # await self.send_json(cart)
        return ClientSerializer(instance=instance).data

    @action()
    async def subscribe_to_cart(self, request_id, **kwargs):
        await self.get_cart.subscribe(request_id=request_id)
        await self.send_json(await self.get_client_from_db(kwargs.get('pk')))

    @action()
    async def add_product_to_cart(self, pk, **kwargs):
        await self.get_order_product(kwargs.get('product'), pk)
        await self.send_json(await self.get_client_from_db(pk))

    @action()
    async def delete_product_from_cart(self, pk, **kwargs):
        await self.delete_from_cart(pk)
        await self.send_json(await self.get_client_from_db(kwargs.get('cart_id')))

    @database_sync_to_async
    def get_client_from_db(self, pk):
        client = Client.objects.get(pk=pk)
        return ClientSerializer(client).data

    @database_sync_to_async
    def get_order_product(self, product, pk):
        cart, status = Cart.objects.get_or_create(pk=pk)
        product_db = Product.objects.get(id=product.get('id'))
        order_item = OrderItem.objects.create(product=product_db, cart=cart)
        # return AddToCartSerializer(data=product_db, context={'cart_id': pk}).initial_data
        return {
            'done': 'done'
        }

    @database_sync_to_async
    def delete_from_cart(self, pk):
        order_item = OrderItem.objects.filter(pk=pk)
        order_item.delete()
