from django.db import models
from django.contrib.auth import models as auth


class Game(models.Model):
    name = models.CharField()
    owner = models.ForeignKey(auth.User)

class Turn(models.Model):
    number = models.PositiveSmallIntegerField()
    game = models.ForeignKey(Game)

    class Meta:
        unique_together = ('number', 'game')

class Faction(models.Models):
    game = models.ForeignKey(Game)
    user = models.ForeignKey(auth.User)
    name = models.CharField()
    