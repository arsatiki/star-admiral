from django.db import models
from django.contrib.auth import models as auth


class Game(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(auth.User)
    created = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
        return u'%s %s' % (self.name, self.owner)
    
    @models.permalink
    def get_absolute_url(self):
        # TODO: when in setup phase
        # return setup view url
        return ('game_detail', (), {'id': self.id})
    
    def setup_phase(self):
        return bool(self.turn_set)
    
    def current_turn(self):
        if self.setup_phase:
            return u'setup phase'
        return self.turn_set.latest().number
    
    class Meta:
        ordering = ['created']
        get_latest_by = 'created'
        

class Turn(models.Model):
    number = models.PositiveSmallIntegerField()
    game = models.ForeignKey(Game)

    class Meta:
        unique_together = ('number', 'game')
        get_latest_by = 'number'

class Faction(models.Model):
    game = models.ForeignKey(Game)
    user = models.ForeignKey(auth.User)
    name = models.CharField(max_length=100)
    