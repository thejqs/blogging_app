from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core import serializers
from main.models import Post, Comment, Upload, Tag
import time
import json

# Create your views here.


def initial(request):
    return render(request, 'index.html')


def all_posts(request):
    time.sleep(0.5)
    posts = Post.objects.all().order_by('-date_posted')

    post_json = serializers.serialize('json', posts)

    return HttpResponse(post_json, content_type="application/json", status=200)


def post_previews(request):
    posts = Post.objects.all().order_by('-date_posted')

    return render(request, 'post-preview.html', {'posts': posts})


def create_post(request):
    title = request.POST['title']
    text = request.POST['text']

    user = User.objects.all().first()

    post = Post.objects.create(
            title=title,
            text=text,
            author=user
        )
    return render(request, 'posts.html', {'posts': [post]})


def edit_post(request, id):
    if request.method == 'DELETE':
        Post.objects.get(id=id).delete()
        return HttpResponse(status=204)

    elif request.method == 'GET':
        post = Post.objects.get(id=id)
        return render(request, 'post.html', {'post': post})


def bootstrap(request):
    return render(request, 'bootstrap.html', {})


def post_admin(request):
    return render(request, 'post_admin.html', {})
