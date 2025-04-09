from rest_framework import generics, status
from quests.serializers.auth_serializers import RegisterSerializer
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from quests.serializers.auth_serializers import ChangePasswordSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    
    if request.method == 'GET':
        return Response({
            "username": user.username,
            "applied_theme_id": user.applied_theme_id,
        })
    
    elif request.method == 'PATCH':
        username = request.data.get("username")
        password = request.data.get("password")
        
        if username:
            user.username = username
        
        if password:
            user.set_password(password)
        
        user.save()
        
        return Response({"message": "✅ 사용자 정보가 수정되었습니다."}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({'message': '비밀번호가 성공적으로 변경되었습니다.'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    email = request.data.get('email')
    
    if email is not None:
        user.email = email
        user.save()
        return Response({"message": "프로필이 업데이트되었습니다."})
    else:
        return Response(
            {"error": "이메일이 필요합니다"},
            status=status.HTTP_400_BAD_REQUEST
        )