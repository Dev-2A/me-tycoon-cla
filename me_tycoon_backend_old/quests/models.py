from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# 테스트용: CustomUser 모델 직접 정의
class Theme(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=20, unique=True)
    coin_cost = models.PositiveIntegerField()

class CustomUser(AbstractUser):
    themes = models.ManyToManyField(Theme, blank=True)
    applied_theme = models.ForeignKey(Theme, null=True, blank=True, on_delete=models.SET_NULL, related_name='applied_users')

    class Meta:
        app_label = 'quests'

class UserStats(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    experience = models.PositiveIntegerField(default=0)
    coin = models.PositiveIntegerField(default=0)
    level = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.user.username} - Lv.{self.level}"

    def check_level_up(self):
        level = 1
        total_exp = self.experience
        while total_exp >= self.exp_required_for(level + 1):
            level += 1
        self.level = level
        self.save()

    def exp_required_for(self, level):
        return 100 * ((level - 1) * level) // 2

    class Meta:
        app_label = 'quests'
