from django.conf.urls.defaults import *
from django.conf import settings

from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
                       (r'^static/(?P<path>.*)$',
                         'django.views.static.serve', 
                         {'document_root': settings.MEDIA_ROOT}),

                       (r'^admin/(.*)', admin.site.root),
                      )
