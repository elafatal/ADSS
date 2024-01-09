from django.db import IntegrityError
from django.shortcuts import render
from django.db.models import Q
from .models import *
from django.contrib import auth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


# Create your views here.
@method_decorator(csrf_protect, name='dispatch')
class SignUpAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        try:
            data = self.request.data
            username = data['username']
            password = data['password']
            re_password = data['re_password']
            student_number = data['student_number']

            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'username already exists.'})
                elif UserProfile.objects.filter(student_number=student_number).exists():
                    return Response({'error': 'student number already exists.'})
                else:
                    user = User.objects.create_user(username=username, password=password)
                    user = User.objects.get(id=user.id)
                    user_profile = UserProfile.objects.create(user=user, student_number=student_number)
                    user_profile.save()
                    return Response({'success': 'User created successfully'})
            else:
                return Response({'error': 'Passwords do not match'})
        except Exception as e:
            return Response({'error': f'{e}'})


@method_decorator(csrf_protect, name='dispatch')
class LoginAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated'})
            else:
                return Response({'error': 'Error authenticating'})
        except:
            return Response({'error': 'Something went wrong when logging in'})


class LogoutAPIView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Logged out'})
        except:
            return Response({'error': 'Something went wrong when logging out'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})


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
                    'firstname': y,
                    'lastname': z,
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
                })

            return Response({'data': travel_data})

        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
                return Response({'error': 'no active travel'})
            travelers_data = [{
                'id': x,
                'firstname': y,
                'lastname': z,
            } for x, y, z in travel.travelers.values_list('user_id', 'user__user__first_name', 'user__user__last_name')]
            travel_data = {
                'id': travel.id,
                'origin_city': travel.origin.city.name,
                'origin_location': travel.origin.name,
                'destination_city': travel.destination.city.name,
                'destination_location': travel.destination.name,
                'situation': travel.situation.title(),
                'travelers': travelers_data,
            }

            return Response({'data': travel_data})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
            return Response({'success': 'travel is made successfully'})
        except ValidationError as e:
            print(e)
            return Response({'error': f'user already has active travel'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


class CheckAuthenticatedAPIView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})


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
            return Response({'success': 'joined successfully'})
        except ValidationError as e:
            print(e)
            return Response({'error': 'travel is full'})
        except IntegrityError as e:
            print(e)
            return Response({'error': 'already joined travel'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
            return Response({'success': 'started successfully'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
                return Response({'error': 'price already set'})
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

            return Response({'success': 'price set successfully'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
            return Response({'success': 'finished successfully'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
            return Response({'success': 'successfully changed to cash'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
                paycheck = Paycheck.objects.get(traveler=traveler)
                paycheck.pay_in_cash = False
                paycheck.save()
                return Response({'success': 'successfully changed to online pay'})
            else:
                return Response({'error': 'cant access'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
            return Response({'data': data})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
            return Response({'data': data})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
            return Response({'data': data})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})


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
                return Response({'error': 'not any active travel'})
            active_travel.situation = "0"
            active_travel.save()
            return Response({'success': 'deleted successfully'})
        except Exception as e:
            print(e)
            return Response({'error': 'an error occurred'})