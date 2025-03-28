from rest_framework import serializers
from quests.models.theme_models import Theme
from quests.models.user_models import UserStats
from django.contrib.auth.models import User


class ThemeSerializer(serializers.ModelSerializer):
    is_owned = serializers.SerializerMethodField()
    is_applied = serializers.SerializerMethodField()
    
    class Meta:
        model = Theme
        fields = ['id', 'code', 'name', 'description', 'coin_cost', 'is_owned', 'is_appliled']
    
    def get_is_owned(self, obj):
        user = self.context['request'].user
        return user.themes.filter(id=obj.id).exists()
    
    def get_is_applied(self, obj):
        user = self.context['request'].user
        return user.profile.applied_theme_id == obj.id if hasattr(user, 'profile') else False