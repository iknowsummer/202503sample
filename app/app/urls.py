"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

# from django.conf import settings
# from django.conf.urls.static import static


from . import views
from .views import CustomerViewSet

router = DefaultRouter()
router.register(r"customers", CustomerViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),  # トップページ用のURLを追加
    # path("customers/", views.customer_list, name="customer_list"),
    path("customer/", TemplateView.as_view(template_name="index.html")),
    path("customer/<int:customer_id>/", TemplateView.as_view(template_name="index.html")),
    path("replace/", views.replace_customers, name="replace_customers"),
    path('export_customers/', views.export_customers, name='export_customers'),
    path('api/', include(router.urls)),
] # fmt: skip

# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
