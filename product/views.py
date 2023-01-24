from rest_framework import generics
from rest_framework.response import Response
from .models import Product, Type
from .serializers import ProductSerializer, ProductCreateSerializer, TypeSerializer


class TypeView(generics.ListAPIView):
    serializer_class = TypeSerializer
    queryset = Type.objects.all()


class ProductView(generics.GenericAPIView):
    serializer_class = ProductCreateSerializer
    queryset = Product.objects.all()

    def get(self, request):
        products = self.get_queryset()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'message': 'Не удалось создать товар!'})
