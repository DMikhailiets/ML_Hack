from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpRequest, HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser
from django import forms
import os,stat

def handle_uploaded_file(f):
    with open('/home/dmikhailiets/My_Projects/ML_Hack.io/backend/ML_Hack/ml_hack/111.jpg', 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()

class ArticleView(APIView):
    def get(self, request):
        
        return Response({'hi'})
    

    def post(self, request):
        print(request.FILES)
        print(request.FILES['file'])
        form = UploadFileForm(request.POST, request.FILES)
        handle_uploaded_file(request.FILES['file'])
        print(handle_uploaded_file)
        in_file=open('/home/dmikhailiets/My_Projects/ML_Hack.io/backend/ML_Hack/ml_hack/111.jpg', 'rb')
        out_file=open('/home/dmikhailiets/My_Projects/ML_Hack.io/backend/ML_Hack/ml_hack/1011.jpg', 'wb')
        for line in in_file:
            for i in range(15):
                in_file.readline()
            out_file.write(line)
        in_file.close()
        out_file.close()
        return Response('Всего 1000 калорий, 250 углеводов 0 жиров 575 белков')
          

        

    # def post(self, request, format=None, *args, **kwargs):
    #     return Response({'raw': request.data, 'data': request._request.POST, 'files': str(request._request.FILES)})
               