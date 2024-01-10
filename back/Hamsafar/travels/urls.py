from django.urls import path
from .views import *

urlpatterns = [
    path('register/', SignUpAPIView.as_view(), name="sign up"),
    path('login/', LoginAPIView.as_view(), name="log in"),
    path('logout/', LogoutAPIView.as_view(), name="log out"),
    path('csrf_cookie/', GetCSRFToken.as_view()),
    path('create/', CreateTravelAPIView.as_view(), name="create travel"),
    path('travels/', UserTravelsAPIView.as_view(), name="user travels"),
    path('authenticated/', CheckAuthenticatedAPIView.as_view(), name="check authenticate"),
    path('join/', JoinTravelAPIView.as_view(), name="join travel"),
    path('start/', StartTravelAPIView.as_view(), name="start travel"),
    path('finish/', FinishTravelAPIView.as_view(), name="finish travel"),
    path('set_price/', SetPriceAPIView.as_view(), name="set price"),
    path('active_travel/', UserActiveTravelAPIView.as_view(), name="active travel"),
    path('change_to_cash/', ChangeToCashAPIView.as_view(), name="change to cash"),
    path('change_to_credit/', ChangeToCreditAPIView.as_view(), name="change to credit"),
    path('all_cities/', AllCitiesAPIView.as_view(), name="all cities"),
    path('city_locations/', CityLocationsAPIView.as_view(), name="city locations"),
    path('cancel/', DeleteTravelAPIView.as_view(), name="delete travel"),
    path('creditor_checks/', CreditorChecksAPIView.as_view(), name="creditor checks"),
]
