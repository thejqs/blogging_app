from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^$', 'main.views.initial', name="initial"),
    url(r'^posts/$', 'main.views.all_posts', name="posts"),

]