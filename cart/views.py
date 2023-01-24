from rest_framework import generics
from rest_framework.response import Response
from .models import Client, OrderItem
from .serializers import ClientSerializer, AddToCartSerializer, ClientCreateSerializer, DeleteItemFromCartSerializer


class ClientView(generics.GenericAPIView):
    serializer_class = ClientCreateSerializer
    queryset = Client.objects.all()

    def get(self, request):
        clients = self.get_queryset()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClientCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'message': 'Не удалось создать клиента и корзину!'})


class CartView(generics.GenericAPIView):
    serializer_class = AddToCartSerializer
    queryset = Client.objects.all()

    def get(self, request, pk):
        client = Client.objects.get(pk=pk)
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    def put(self, request, pk):
        serializer = AddToCartSerializer(data=request.data, context={'cart_id': pk})
        if serializer.is_valid():
            return Response(serializer.data)
        return Response({'message': 'Не удалось добавить товар в корзину!'})


class OrderItemView(generics.GenericAPIView):
    serializer_class = DeleteItemFromCartSerializer
    queryset = OrderItem.objects.all()

    def delete(self, request, pk, id):
        serializer = DeleteItemFromCartSerializer(data=request.data, context={'item_id': id})
        if serializer.is_valid():
            return Response(serializer.data)
        return Response({'message': 'Не удалось создать клиента и корзину!'})
