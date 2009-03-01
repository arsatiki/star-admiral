from __future__ import absolute_import
from django.contrib import admin
from .models import Game, Invite, Faction

admin.site.register(Game)
admin.site.register(Invite)
admin.site.register(Faction)

