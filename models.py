from django.db import models

# Create your models here.

class PositionManager(models.Manager):
    def within(self, point, radius):
        x = point.x
        y = point.y
        z = point.z
        queryset = Position.filter(x__gte=x-radius, x__lte=x+radius)
        queryset = queryset.filter(y__gte=y-radius, y__lte=y+radius)
        if z: 
            queryset = queryset.filter(z__gte=z-radius, z__ltr=z+radius)

class Position(models.Model):
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField(null = True, blank = True)
    
    objects = PositionManager()
    
    def within(self, radius):
        return Position.objects.within(self, radius)


class Solarsystem(models.Model):
    position = OneToOneField