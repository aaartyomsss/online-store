from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('store_api.urls')),
]
# NB! In production files should be store via cloud-services and not be stored in a django project itself.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
