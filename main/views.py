from django.shortcuts import render
from main.models import Post, Comment, Upload, Tag
import time

# Create your views here.


def initial(request):
    return render(request, 'base.html')


def all_posts(request):
    time.sleep(4)
    posts = Post.objects.all()
    return render(request, 'posts.html', {'posts': posts})
