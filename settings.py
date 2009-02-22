from site_settings import *

SITE_ID = 1701

# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
ADMIN_MEDIA_PREFIX = '/media/'

ROOT_URLCONF = 'urls'

INSTALLED_APPS += ('django.contrib.admin', 'games')

TEMPLATE_DIRS += projectpath('templates')