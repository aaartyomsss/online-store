from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q

from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from .serializers import DetailProductSerializer
from .models import Product


@api_view(['GET'])
def api_overview(request):

    API_URLS = {
        'All products': '/all-products/',
        'Product detail': '/product-detail/<str:id>'
    }

    return Response(API_URLS)


@api_view(['GET'])
def all_products(request):
    products = Product.objects.all()
    serializer = DetailProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)
        serializer = DetailProductSerializer(product, many=False)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        raise NotFound(f"Product with id {id} does not exist")


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated,])
def add_product(request):
    serializer = DetailProductSerializer(data=request.data)
    if request.user is not None:
        if serializer.is_valid():
            serializer.save(seller=request.user)
            return Response(serializer.data)
    else:
        raise PermissionDenied({ 'error': 'User is not authorized' })


@api_view(['GET'])
def search_for_products(request, query):
    products = Product.objects.filter(Q(barcode__icontains=query) | Q(name__icontains=query))
    serializer = DetailProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated,])
def update_product_details(request, id):
    try:
        product = Product.objects.get(id=id)
        if product.seller == request.user:
            serializer = DetailProductSerializer(data=request.data, instance=product, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        else:
            raise PermissionDenied('You cannot modify other people products')
    except ObjectDoesNotExist:
        raise NotFound(f"Product with id {id} does not exist")


@api_view(['DELETE'])
@permission_classes([IsAuthenticated,])
def delete_product(request, id):
    try:
        product = Product.objects.get(id=id)
        if product.seller == request.user:
            product.delete()
            return Response('Successfully deleted')
        else:
            raise PermissionDenied('You cannot delete other persons products')
    except ObjectDoesNotExist:
        raise NotFound(f"Product with id {id} does not exist")


class ObtainTokenAndUserId(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(ObtainTokenAndUserId, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'user_id': token.user_id})
