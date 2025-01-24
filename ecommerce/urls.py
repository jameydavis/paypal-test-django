from django.contrib import admin
from django.urls import path
from store import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  path('admin/', admin.site.urls),
  path('', views.product_list, name='product_list'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
