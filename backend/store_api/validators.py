from django.core.exceptions import ValidationError


def non_zero_validator(value):
    if value == 0:
        raise ValidationError('Price cannot be set to zero')
