from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from store_api.models import Product
from django.core.files import File
from django.conf import settings
import random
import uuid

RANDOM_NAMES = ['Toothpaste', 'Toothbrush', 'Minoxidil', 'Insulin jab', 'Calculator']
RANDOM_PRICE = [10, 20, 50, 100, 200]


class Command(BaseCommand):

    help = 'Creates random products into DB'

    def add_arguments(self, parser):
        parser.add_argument('number_to_create', type=int, default=10, nargs='?')

    def handle(self, *args, **options):
        number_of_products_to_add = options.get('number_to_create')
        users = User.objects.all()
        default_img = File(open(f'{settings.MEDIA_ROOT}\\no_photo.png', 'rb'))
        for product in range(number_of_products_to_add):
            random_index = random.randint(0, 4)
            random_user_index = random.randint(0, 1)
            name = RANDOM_NAMES[random_index]
            price = RANDOM_PRICE[random_index]
            barcode = uuid.uuid4()
            description = barcode
            seller = users[random_user_index]
            Product.objects.create(name=name,
                                   price=price,
                                   barcode=barcode,
                                   description=description,
                                   seller=seller,
                                   product_image=default_img)
