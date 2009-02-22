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
        return ('game_detail', (), {'id': self.id})
    
    class Meta:
        ordering = ['created']
        get_latest_by = 'created'
        

class Turn(models.Model):
    number = models.PositiveSmallIntegerField()
    game = models.ForeignKey(Game)

    class Meta:
        unique_together = ('number', 'game')

class Faction(models.Model):
    game = models.ForeignKey(Game)
    user = models.ForeignKey(auth.User)
    name = models.CharField(max_length=100)
    