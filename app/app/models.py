from django.db import models


# 顧客テーブル (Customer)
class Customer(models.Model):
    name = models.CharField(max_length=80)  # 顧客名（必須）
    email = models.EmailField(unique=True, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)  # 登録日時
    updated_at = models.DateTimeField(auto_now=True)  # 更新日時

    def __str__(self):
        return self.name  # 管理画面での表示名
