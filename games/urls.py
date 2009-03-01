from __future__ import absolute_import

from django.conf.urls.defaults import *

from django.views.generic import list_detail

from .models import Game
from .views import setup_game

gameset = {'queryset': Game.objects.all()}

urlpatterns = patterns('',
    ('^$', list_detail.object_list, gameset),

    # Game detail. TODO: Convert to slug?
    url(r'^(?P<object_id>\d+)/$', list_detail.object_detail,
        gameset, name="game_detail"),
    
    # Game setup
    url(r'^setup/(\d+)/$', setup_game),

)
