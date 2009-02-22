from django.db import models
from django.contrib.auth import models as auth


class PositionManager(models.Manager):
    def within(self, point, radius):
        x = point.x
        y = point.y
        z = point.z
        queryset = self.get_query_set()
        queryset = queryset.filter(x__range = (x-radius, x+radius))
        queryset = queryset.filter(y__range = (y-radius, y+radius))
        if z: 
            queryset = queryset.filter(z__range = (z-radius, z+radius))
        
        return queryset

class Position(models.Model):
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField(null = True, blank = True)
    
    objects = PositionManager()
    
    def within(self, radius):
        return Position.objects.within(self, radius)


class Solarsystem(models.Model):
    position = models.OneToOneField(Position)
    name = models.CharField(max_length = 25)

class Planet(models.Model):
    solarsystem = models.ForeignKey(Solarsystem)
    rank = models.PositiveIntegerField()
    
    class Meta:
        unique_together = ("solarsystem", "rank")

class Fleet(models.Model):
    position = models.OneToOneField(Position)

class Ship(models.)
    fleet = models.ForeignKey(Fleet)
    name = models.CharField(max_length = 25)