from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpRequest, HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser



class ArticleView(APIView):
    def get(self, request):
        
        return Response({'hi'})
    

    def post(self, request):
        with open(request, 'rb') as f:
            contents = f.read()
            parser_classes = (MultiPartParser, FormParser, )

        

    def post(self, request, format=None, *args, **kwargs):
        return Response({'raw': request.data, 'data': request._request.POST, 'files': str(request._request.FILES)})
               