from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(City)
admin.site.register(ImportantLocation)
admin.site.register(Travel)
admin.site.register(Traveler)
admin.site.register(Paycheck)