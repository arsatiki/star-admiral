from django.conf.urls.defaults import *
from django.conf import settings

from django.contrib import admin
from django.contrib.auth import views as auth

from django.views.generic import simple

admin.autodiscover()

urlpatterns = patterns('',
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT}),
    
    # Splash screen
    ('^$', simple.direct_to_template, {'template': 'index.html'}),
    
    # Login and logout TODO
    url('^login/', auth.login, {}, name='login'),
    url('^logout/', auth.logout, {'next_page': '/games/'}, name='logout'),
    
    # Games
    ('^games/', include('games.urls')),
   
   (r'^admin/(.*)', admin.site.root),

)
