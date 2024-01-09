from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models.signals import pre_save
from django.dispatch import receiver
from datetime import datetime


# Create your models here.

def student_number_validator(value):
    from django.core.exceptions import ValidationError
    if len(value) != 11:
        raise ValidationError('it must be 11 digits')


def card_number_validator(value):
    from django.core.exceptions import ValidationError
    if len(value) != 16:
        raise ValidationError('it must be 16 digits')


def validate_file_extension(value):
    import os
    from django.core.exceptions import ValidationError
    ext = os.path.splitext(value.name)[1]
    valid_extension = ['.jpg', '.png']
    if not ext.lower() in valid_extension:
        raise ValidationError('Unsupported file extension')


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_number = models.CharField(max_length=11, blank=False, null=False, unique=True,
                                      validators=[student_number_validator])
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    avatar = models.FileField(upload_to='files/user_avatar/', null=True, blank=True,
                              validators=[validate_file_extension])

    def __str__(self):
        return self.user.username


class City(models.Model):
    name = models.CharField(max_length=128, null=False, blank=False, unique=True)

    def __str__(self):
        return self.name


class ImportantLocation(models.Model):
    name = models.CharField(max_length=256, null=False, blank=False)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return self.city.name + " " + self.name


travel_choices = (
    ("0", "cancelled"),
    ("1", "not started"),
    ("2", "traveling"),
    ("3", "finished"),
)


class Travel(models.Model):
    origin = models.ForeignKey(ImportantLocation, null=False, blank=False, on_delete=models.PROTECT,
                               related_name="origins")
    destination = models.ForeignKey(ImportantLocation, null=False, blank=False, on_delete=models.PROTECT,
                                    related_name="destinations")
    made_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, null=False, blank=False,
                                related_name="travels_made_by_user")
    driver = models.ForeignKey(UserProfile, on_delete=models.PROTECT, null=True, blank=True, related_name="drivings")
    full_paid = models.BooleanField(default=False, null=False)
    situation = models.CharField(max_length=3, default="1", null=False, choices=travel_choices)
    created_at = models.DateTimeField(default=datetime.now(), blank=False)
    price = models.IntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.pk is None:
            user_profile = self.made_by

            has_existing_travels = Travel.objects.filter(
                Q(situation="1") | Q(situation="2"),
                travelers__user=user_profile
            ).exists()

            if has_existing_travels:
                raise ValidationError("User already has active travel. Cannot create new travels.")

        super().save(*args, **kwargs)


class Paycheck(models.Model):
    card_number = models.CharField(max_length=16, null=False, blank=True,
                                   validators=[card_number_validator])
    payed = models.BooleanField(default=False, null=False)
    price = models.IntegerField(null=False, blank=False)
    pay_in_cash = models.BooleanField(default=False, null=False, blank=False)


class Traveler(models.Model):
    travel = models.ForeignKey(Travel, on_delete=models.CASCADE, null=False, blank=False, related_name="travelers")
    user = models.ForeignKey(UserProfile, on_delete=models.PROTECT, null=False, blank=False, related_name="travelings")
    paycheck = models.ForeignKey(Paycheck, on_delete=models.SET_NULL, null=True, blank=True,
                                 related_name="source_travel")

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['travel', 'user'], name='unique traveler')
        ]


@receiver(pre_save, sender=Traveler)
def check_traveler_limit(sender, instance, **kwargs):
    if instance.id is None and instance.travel and instance.travel.driver is None and instance.travel.travelers.count() >= 4:
        raise ValueError("A travel can have a maximum of 4 travelers.")
    if instance.id is None and instance.travel and instance.travel.driver is not None and instance.travel.travelers.count() >= 5:
        raise ValueError("A travel can have a maximum of 5 travelers.")
