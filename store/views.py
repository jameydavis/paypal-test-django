from django.shortcuts import render
from django.conf import settings
from .models import Product

def product_list(request):
  products = Product.objects.all()
  return render(request, 'store/product_list.html', {
    'products': products,
    'paypal_client_id': settings.PAYPAL_CLIENT_ID,
  })
