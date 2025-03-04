from django.shortcuts import render
from .models import Customer


def customer_list(request):
    customers = Customer.objects.all()  # 全件取得
    return render(request, "customer_list.html", {"customers": customers})
