from django.db import models
from django.contrib.auth import models as auth


class Game(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(auth.User)
    created = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
        return self.name
    
    @models.permalink
    def get_absolute_url(self):
        if self.setup_phase():
            return ("games.views.setup_game", (self.id,), {})
        return ('game_detail', (), {'object_id': self.id})
    
    def setup_phase(self):
        return bool(self.turn_set)
    
    def current_turn(self):
        if self.setup_phase():
            return u'setup phase'
        return self.turn_set.latest().number
    
    class Meta:
        ordering = ['created']
        get_latest_by = 'created'

class Invite(models.Model):
    game = models.ForeignKey(Game)
    player = models.ForeignKey(auth.User)
    
    def __unicode__(self):
        return u"Invite to player %s for game %s" % (self.player, self.game)

class Turn(models.Model):
    number = models.PositiveSmallIntegerField()
    game = models.ForeignKey(Game)

    def __unicode__(self):
        return u"Turn %d of game (%s)", (self.number, self.game)

    class Meta:
        unique_together = ('number', 'game')
        get_latest_by = 'number'

class Faction(models.Model):
    game = models.ForeignKey(Game)
    player = models.ForeignKey(auth.User)
    name = models.CharField(max_length=100)
    
    def __unicode__(self):
        return self.name
    
    class Meta:
        unique_together = ('game', 'name')

class Orders(models.Model):
    turn = models.ForeignKey(Turn)
    faction = models.ForeignKey(Faction)

