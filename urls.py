from django.conf.urls.defaults import *
from django.conf import settings

from django.contrib import admin

from django.views.generic import simple, list_detail, create_update

admin.autodiscover()

urlpatterns = patterns('',
    (r'^static/(?P<path>.*)$', 'django.views.static.serve', 
        {'document_root': settings.MEDIA_ROOT}),

    # Splash screen
    ('^$', '')
                        

                       (r'^admin/(.*)', admin.site.root),
                      )
