import os
import pandas as pd
import urllib.parse
from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from django.db import connection
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import CustomerSerializer
from .models import Customer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    # 一覧 (list) を無効化
    # def list(self, request, *args, **kwargs):
    #     return Response(status=404)  # 404 エラーを返す


def home(request):
    return render(request, "home.html")


def customer_list(request):
    name = request.GET.get("name")
    phone = request.GET.get("phone")
    if name and phone:
        customers = Customer.objects.filter(
            company_name__icontains=name,
            phone_number__icontains=phone
        )  # fmt:skip
    elif name:
        customers = Customer.objects.filter(company_name__icontains=name)
    elif phone:
        customers = Customer.objects.filter(phone_number__icontains=phone)
    else:
        # クエリ無しは全件表示
        customers = Customer.objects.all()

    return render(request, "customer_list.html", {"customers": customers})


def customer_detail(request, customer_id):
    customer = Customer.objects.get(id=customer_id)  # 1件取得
    return render(request, "customer_detail.html", {"customer": customer})


def replace_customers(request):
    if request.method == "POST" and request.FILES["excel_file"]:
        excel_file = request.FILES["excel_file"]
        fs = FileSystemStorage()
        file_path = fs.save(excel_file.name, excel_file)
        file_path = fs.path(file_path)

        # トランザクション管理で安全に実行
        from django.db import transaction

        with transaction.atomic():
            # 既存データを削除
            Customer.objects.all().delete()

            # IDのカウンターをリセット
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM sqlite_sequence WHERE name='app_customer'")

            # Excel 読み込みと保存（bulk_create）
            df = pd.read_excel(file_path)
            customers = []
            for i, row in df.iterrows():
                customers.append(
                    Customer(
                        company_name=row["会社名"],
                        contact_person = row["お名前"] if pd.notna(row["お名前"]) else "",
                        postal_code = row["郵便番号"] if pd.notna(row["郵便番号"]) else "",
                        address1 = row["住所"] if pd.notna(row["住所"]) else "",
                        address2 = row["アパート・ビル・建物名など"] if pd.notna(row["アパート・ビル・建物名など"]) else "",
                        phone_number = row["電話番号"] if pd.notna(row["電話番号"]) else "",
                        note = row["備考"] if pd.notna(row["備考"]) else "",
                        billing_name = row["請求用会社名"] if pd.notna(row["請求用会社名"]) else "",
                    )  # fmt: skip
                )
            Customer.objects.bulk_create(customers)

        # 使用ファイル削除
        if os.path.exists(file_path):
            os.remove(file_path)

        return redirect("/customer/")
    return render(request, "replace_customers.html")


def export_customers(request):
    # Customer テーブルのデータを取得
    customers = Customer.objects.all()

    # pandas DataFrame に変換
    data = list(
        customers.values(
            "company_name",
            "contact_person",
            "postal_code",
            "address1",
            "address2",
            "phone_number",
            "note",
            "billing_name",
        )
    )

    df = pd.DataFrame(data)

    columns = [
        "会社名",
        "お名前",
        "郵便番号",
        "住所",
        "アパート・ビル・建物名など",
        "電話番号",
        "備考",
        "請求用会社名",
    ]

    df.columns = columns

    # 日本語ファイル名をURLエンコード
    filename = "住所録.xlsx"
    encoded_filename = urllib.parse.quote(filename)

    # Excel ファイルとしてレスポンス
    response = HttpResponse(
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    response["Content-Disposition"] = f"attachment; filename*=UTF-8''{encoded_filename}"

    # DataFrame を Excel として保存
    df.to_excel(response, index=False, sheet_name="Sheet1")

    return response
