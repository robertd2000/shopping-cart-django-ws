from django.urls import re_path

from cart import consumers

websocket_urlpatterns = [
    re_path(r'ws/socket-server/', consumers.CartConsumer.as_asgi()),
]
