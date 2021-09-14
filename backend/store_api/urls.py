from django.urls import path
from store_api import views

urlpatterns = [
    path('', views.api_overview, name='api_overview'),
    path('all-products/', views.all_products, name='all_products'),
    path('product-detail/<str:id>/', views.product_detail, name='product_detail'),
    path('delete-product/<str:id>/', views.delete_product, name='delete_product'),
    path('add-product/', views.add_product, name='add_product'),
    path('token-auth/', views.ObtainTokenAndUserId.as_view(), name='token_auth'),
    path('products/search/<str:query>/', views.search_for_products, name='search_for_products'),
    path('update-product/<str:id>/', views.update_product_details, name='update_product_details')
]
