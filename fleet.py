from future import division
from math import radians
import cmath


class Ship(object):
    """Ship(mass=100, speed=5, attack=20, hitpoint_mul = 2, pos = 0)"""
    def __init__(self, mass=100, speed=5, attack=20, hitpoint_mul = 2, pos = 0j):
        super(Ship, self).__init__()
        self.mass = mass
        self.inertia = mass/speed
        self.attack = 20
        self.__hitpoints = hitpoint_mul * mass
        
        self.heading = 1
        self.position = pos
        
        self.alive = True
        
    
    def set_hp(self, val):
        self.__hitpoints == val
        if self.__hitpoints < 0:
            print self, "died"
            self.alive = False
        
    def get_hp(self):
        return self.__hitpoints
        
    hitpoints = property(get_hp, set_hp, None, "Ship hitpoints")
    
    def fire(self, target):
        distance = abs(self.pos - target.pos)
        damage = attack / distance**2
        self.hitpoints -= damage
    
    def advance(self):
        movement = self.heading / self.inertia
        self.pos += movement
        
    def turn(self, direction):
        angle = radians(direction * 45)
        self.heading *= cmath.exp(complex(0, angle))
        
        