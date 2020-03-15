from django.urls import path
from .views import ArticleView
app_name = "ml"
# app_name will help us do a reverse look-up latter.

urlpatterns = [
    path('ml/', ArticleView.as_view()),
]