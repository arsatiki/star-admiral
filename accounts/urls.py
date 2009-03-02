from __future__ import absolute_import

from django.conf.urls.defaults import *
from django.contrib.auth import views as auth
from django.contrib.auth.forms import AuthenticationForm

from django.views.generic import simple

urlpatterns = patterns('',
    # Login and logout TODO
    url('^login/', auth.login, {}, name='login'),
    url('^logout/', auth.logout, {'next_page': '/games/'}, name='logout'),
 
    # Profile
    url('^profile/', simple.direct_to_template, 
        {'template': 'accounts/profile.html'}, name='profile'),
)
