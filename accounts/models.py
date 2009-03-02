from django.db import models
from django.contrib.auth import views as auth

class UserProfile(models.Model):
    user = models.ForeignKey(auth.User, unique=True)
