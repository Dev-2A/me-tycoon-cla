from rest_framework import viewsets, permissions
from quests.models import Theme
from quests.serializers.theme_serializers import ThemeSerializer


class ThemeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    permission_classes = [permissions.AllowAny]