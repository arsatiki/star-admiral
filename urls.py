from django.conf.urls.defaults import *
from django.conf import settings

from django.contrib import admin

from django.views.generic import simple

admin.autodiscover()

urlpatterns = patterns('',
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT}),
    
    # Splash screen
    ('^$', simple.direct_to_template, {'template': 'index.html'}),
    
    # Games
    ('^games/', include('games.urls')),
    
    # Accounts
    ('^accounts/', include('accounts.urls')),
   
    (r'^admin/(.*)', admin.site.root),

)
