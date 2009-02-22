from __future__ import absolute_import

from django.conf.urls.defaults import *

from django.views.generic import list_detail

from .models import Game

urlpatterns = patterns('',
    ('^$', list_detail.object_list, {'queryset': Game.objects.all()}),
)
