from django.db import models
from .validators import non_zero_validator
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False, db_index=True)
    price = models.PositiveIntegerField(blank=False, null=False, validators=[non_zero_validator])
    seller = models.ForeignKey(User, on_delete=models.CASCADE) # If user is deleted, we want to remove all Products related to him
    description = models.CharField(max_length=250, blank=False, null=False)
    product_image = models.ImageField()
    barcode = models.CharField(max_length=20, unique=True, blank=False, null=False, db_index=True)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.name
