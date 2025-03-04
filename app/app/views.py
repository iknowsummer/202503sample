from django.shortcuts import render
from .models import Customer


def customer_list(request):
    customers = Customer.objects.all()  # 全件取得
    return render(request, "customer_list.html", {"customers": customers})


def customer_detail(request, customer_id):
    customer = Customer.objects.get(id=customer_id)  # 1件取得
    return render(request, "customer_detail.html", {"customer": customer})
