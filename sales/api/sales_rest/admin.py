from django.contrib import admin

from .models import Salesman, Sale, Customer, AutomobileVO

# Register your models here.

admin.site.register(Salesman)
admin.site.register(Sale)
admin.site.register(Customer)
admin.site.register(AutomobileVO)
