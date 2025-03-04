from django.db import models
from django.core.validators import RegexValidator

postal_code_validator = RegexValidator(
    regex=r"^\d{3}-\d{4}$", message="郵便番号はXXX-XXXXの形式で入力してください。"
)


# 顧客テーブル (Customer)
class Customer(models.Model):
    company_name = models.CharField(max_length=80)  # 顧客名（必須）
    contact_person = models.CharField(max_length=20, blank=True, null=True)  # 担当者名
    postal_code = models.CharField(max_length=8, blank=True, null=True, validators=[postal_code_validator])  # fmt: skip
    address1 = models.CharField(max_length=200, blank=True, null=True)
    address2 = models.CharField(max_length=200, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    note = models.CharField(max_length=200, blank=True, null=True)
    billing_name = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)  # 登録日時
    updated_at = models.DateTimeField(auto_now=True)  # 更新日時
    # email = models.EmailField(unique=True, blank=True, null=True)

    def __str__(self):
        return self.name  # 管理画面での表示名
