from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class DetailProductSerializer(serializers.ModelSerializer):

    seller = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class SummaryProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['name', 'id', 'price', 'product_image', 'quantity', 'barcode']
