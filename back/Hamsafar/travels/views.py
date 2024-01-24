from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.shortcuts import render
from django.db.models import Q, When, Case, Count
from rest_framework.exceptions import AuthenticationFailed

from django.http import HttpResponse
from .models import *
from django.contrib import auth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from jose import jwt
# import jwt
from rest_framework.authentication import TokenAuthentication
from .utils import generate_access_token

# Create your views here.
from Hamsafar import settings


class SignUpAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request, format=None):
        try:
            data = self.request.data
            username = data['student_number']
            password = data['password']
            re_password = data['re_password']
            student_number = data['student_number']
            phone_number = data['phone_number']

            if password == re_password:
                if User.objects.filter(username=student_number).exists():
                    return Response({'error': 'username already exists.', 'status': 'fail'})
                else:
                    user = User.objects.create_user(username=username, password=password)
                    user = User.objects.get(id=user.id)
                    access_token = generate_access_token(user)
                    user_profile = UserProfile.objects.create(user=user, student_number=student_number,
                                                              phone_number=phone_number)
                    user_profile.save()
                    response = Response({'message': 'User created successfully', 'status': 'success'})
                    return Response
            else:
                return Response({'error': 'Passwords do not match', 'status': 'fail'})
        except Exception as e:
            print(e)
            return Response({'error': f'an error occurred', 'status': 'fail'})


class LoginAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['student_number']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                user_access_token = generate_access_token(user)
                response = Response()
                response.set_cookie(key='access_token', value=user_access_token, httponly=True)
                response.data = {
                    'access_token': user_access_token
                }
                return response

            else:
                return Response({'error': 'Error authenticating', 'status': 'fail'})
        except:
            return Response({'error': 'Something went wrong when logging in', 'status': 'fail'})


class UserLogoutViewAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        user_token = request.COOKIES.get('access_token', None)
        if user_token:
            response = Response()
            response.delete_cookie('access_token')
            response.data = {
                'message': 'Logged out successfully.'
            }
            return response
        response = Response()
        response.data = {
            'message': 'User is already logged out.'
        }
        return response


def get_user_from_request(request):
    user_token = request.headers.get('Authorization', '').split(' ')[-1]

    if not user_token:
        raise AuthenticationFailed('Unauthenticated user.')

    payload = jwt.decode(user_token, settings.SECRET_KEY, algorithms=['HS256'])

    user = User.objects.filter(id=payload['user_id']).first()
    return user


class UserViewAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        user_token = request.headers.get('Authorization', '').split(' ')[-1]
        if not user_token:
            raise AuthenticationFailed('Unauthenticated user.')

        payload = jwt.decode(user_token, settings.SECRET_KEY, algorithms=['HS256'])

        user = User.objects.filter(id=payload['user_id']).first()

        return Response({'data': user.username, 'status':'success'})


class LogoutAPIView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'message': 'Logged out', 'status': 'success'})
        except:
            return Response({'error': 'Something went wrong when logging out', 'status': 'fail'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'message': 'CSRF cookie set', 'status': 'success'})


class UserTravelsAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            travels = Travel.objects.filter(
                Q(travelers__user=user_profile)
            )
            travel_data = []
            for travel in travels:
                travelers_data = [{
                    'id': x,
                    'name': y + " " + z,
                } for x, y, z in
                    travel.travelers.values_list('user_id', 'user__user__first_name', 'user__user__last_name')]
                travel_data.append({
                    'id': travel.id,
                    'origin_city': travel.origin.city.name,
                    'origin_location': travel.origin.name,
                    'destination_city': travel.destination.city.name,
                    'destination_location': travel.destination.name,
                    'made_by': travel.made_by.user.first_name + travel.made_by.user.last_name,
                    'travelers': travelers_data,
                    'situation': travel.situation,
                    'time': "" if travel.time is None else travel.time.strftime("%m/%d/%Y, %H:%M:%S"),
                })

            return Response({'data': travel_data, 'status': 'success'})

        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class UserActiveTravelAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            travel = Travel.objects.get(
                ~Q(situation="3") & Q(travelers__user=user_profile) & ~Q(situation="0")
            )
            if travel is None:
                return Response({'error': 'no active travel', 'status': 'fail'})
            travelers_data = [{
                'id': x,
                'name': y + " " + z,
            } for x, y, z in travel.travelers.values_list('user_id', 'user__user__first_name', 'user__user__last_name')]
            travel_data = {
                'id': travel.id,
                'origin_city': travel.origin.city.name,
                'origin_location': travel.origin.name,
                'destination_city': travel.destination.city.name,
                'destination_location': travel.destination.name,
                'situation': travel.situation.title(),
                'travelers': travelers_data,
                'time': "" if travel.time is None else travel.time.strftime("%m/%d/%Y, %H:%M:%S"),
            }

            return Response({'data': travel_data, 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class CreateTravelAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        try:
            data = self.request.data
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            isDriver = data['is_driver']
            origin = ImportantLocation.objects.get(id=data['origin_id'])
            destination = ImportantLocation.objects.get(id=data['destination_id'])
            travel = Travel.objects.create(origin=origin, destination=destination, made_by=user_profile)
            travel.save()
            traveler = Traveler.objects.create(travel=travel, user=user_profile)
            traveler.save()
            if int(isDriver) == 1:
                travel.driver = user_profile
                travel.save()
            return Response({'message': 'travel is made successfully', 'status': 'success'})
        except ValidationError as e:
            print(e)
            return Response({'error': f'user already has active travel', 'status': 'fail'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class CheckAuthenticatedAPIView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success', 'status': 'success'})
            else:
                return Response({'isAuthenticated': 'error', 'status': 'success'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status', 'status': 'fail'})


class JoinTravelAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        try:
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            data = self.request.data
            travel_id = data['travel_id']
            travel = Travel.objects.get(id=travel_id)
            traveler = Traveler.objects.create(user=user_profile, travel=travel)
            traveler.save()
            return Response({'message': 'joined successfully', 'status': 'success'})
        except ValidationError as e:
            print(e)
            return Response({'error': 'travel is full', 'status': 'fail'})
        except IntegrityError as e:
            print(e)
            return Response({'error': 'already joined travel', 'status': 'fail'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class StartTravelAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        try:
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            travel = Travel.objects.get(
                Q(situation=1) & Q(made_by=user_profile)
            )
            travel.situation = "2"
            travel.save()
            return Response({'message': 'started successfully', 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class SetPriceAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        try:
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            data = self.request.data
            price = int(data['price'])
            card_number = data['card_number']
            travel = Travel.objects.get(
                Q(situation=2) & Q(made_by=user_profile)
            )
            if Paycheck.objects.filter(Q(source_travel__travel=travel)).exists():
                return Response({'error': 'price already set', 'status': 'fail'})
            traveler_count = travel.travelers.count()
            if traveler_count == 5:
                each_price = price / traveler_count - 1
                for traveler in travel.travelers.all():
                    if travel.driver == traveler.user:
                        continue
                    paycheck = Paycheck.objects.create(card_number=card_number, price=each_price)
                    paycheck.save()
                    traveler.paycheck = paycheck
                    traveler.save()

            else:
                each_price = price / traveler_count
                for traveler in travel.travelers.all():
                    paycheck = Paycheck.objects.create(card_number=card_number, price=each_price)
                    paycheck.save()
                    traveler.paycheck = paycheck
                    traveler.save()

                user_paycheck = Paycheck.objects.get(
                    Q(source_travel__user=user_profile) & Q(source_travel__travel=travel)
                )
                user_paycheck.payed = True
                user_paycheck.save()

            return Response({'message': 'price set successfully', 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class FinishTravelAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        try:
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            travel = Travel.objects.get(
                Q(situation=2) & Q(made_by=user_profile)
            )
            travel.situation = "3"
            travel.save()
            return Response({'message': 'finished successfully', 'success': 'fail'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class ChangeToCashAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        try:
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            data = self.request.data
            traveler_id = data['traveler_id']
            traveler = Traveler.objects.get(id=traveler_id)
            paycheck = Paycheck.objects.get(traveler=traveler)
            paycheck.pay_in_cash = True
            paycheck.save()
            paycheck.payed = True
            paycheck.save()
            return Response({'message': 'successfully changed to cash', 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class ChangeToCreditAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        try:
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            data = self.request.data
            traveler_id = data['traveler_id']
            traveler = Traveler.objects.get(id=traveler_id)
            if traveler.travel.made_by == user_profile:
                paycheck = Paycheck.objects.get(source_travel=traveler)
                paycheck.pay_in_cash = False
                paycheck.save()
                return Response({'message': 'successfully changed to online pay', 'status': 'success'})
            else:
                return Response({'error': 'cant access', 'status': 'fail'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class CreditorChecksAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            paychecks = Paycheck.objects.filter(
                Q(source_travel__travel__made_by=user_profile)
            )

            data = []
            for paycheck in paychecks:
                data.append({
                    'card_number': paycheck.card_number,
                    'price': paycheck.price,
                    'pay_in_cash': paycheck.pay_in_cash,
                    'user': UserProfile.objects.get(
                        Q(travelings__paycheck_id=paycheck.id)
                    ).user.first_name + UserProfile.objects.get(
                        Q(travelings__paycheck_id=paycheck.id)
                    ).user.last_name,
                })
            return Response({'data': data, 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class AllCitiesAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            cities = City.objects.all()
            data = []
            for city in cities:
                data.append({'name': city.name,
                             'id': city.id,
                             })
            return Response({'data': data, 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class CityLocationsAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            data = self.request.data
            city_id = data['city_id']
            locations = ImportantLocation.objects.filter(city_id=city_id)
            data = []
            for location in locations:
                data.append({
                    'name': location.name,
                    'id': location.id,
                })
            return Response({'data': data, 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class DeleteTravelAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, format=None):
        try:
            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            active_travel = Travel.objects.get(
                Q(situation="1") & Q(made_by=user_profile)
            )
            if active_travel is None:
                return Response({'error': 'not any active travel', 'status': 'fail'})
            active_travel.situation = "0"
            active_travel.save()
            return Response({'message': 'deleted successfully', 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred', 'status': 'fail'})


class SearchTravelsAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            data = self.request.data
            origin_id = data['origin_id']
            origin = ImportantLocation.objects.get(id=origin_id)
            destination_id = data['destination_id']
            destination = ImportantLocation.objects.get(id=destination_id)
            result = Travel.objects.annotate(num_travelers=Count('travelers'))
            not_full_travels = result.filter(driver__isnull=True, num_travelers__lt=4) | result.filter(
                driver__isnull=False,
                num_travelers__lt=5)
            travels = not_full_travels.filter(
                Q(origin__city=origin.city) & Q(destination__city=destination.city) & Q(situation=1)
            ).order_by(
                Case(
                    When(origin=origin, destination=destination, then=0),
                    When(origin=origin, then=1),
                    When(destination=destination, then=2),
                    default=3,
                    output_field=models.IntegerField(),
                )
            )
            travel_data = []
            for travel in travels:
                travelers_data = [{
                    'id': x,
                    'name': y + " " + z,
                } for x, y, z in
                    travel.travelers.values_list('user_id', 'user__user__first_name', 'user__user__last_name')]
                travel_data.append({
                    'id': travel.id,
                    'origin_city': travel.origin.city.name,
                    'origin_location': travel.origin.name,
                    'destination_city': travel.destination.city.name,
                    'destination_location': travel.destination.name,
                    'made_by': travel.made_by.user.first_name + travel.made_by.user.last_name,
                    'travelers': travelers_data,
                    'situation': travel.situation,
                    'time': "" if travel.time is None else travel.time.strftime("%m/%d/%Y, %H:%M:%S"),
                })
            if len(travel_data) == 0:
                return Response({'data': travel_data, 'status': 'not found'})
            return Response({'data': travel_data, 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})
