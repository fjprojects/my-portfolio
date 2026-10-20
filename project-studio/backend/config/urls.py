from pathlib import Path
from django.contrib import admin
from django.http import HttpResponse, JsonResponse
from django.urls import path, include, re_path
from django.conf import settings

def spa(request):
    index = settings.BASE_DIR.parent / 'dist' / 'index.html'
    if not index.exists():
        return JsonResponse({'detail':'Frontend not built. Run npm run build:server, or use Vite on port 5173.'}, status=503)
    return HttpResponse(index.read_text(encoding='utf-8'), content_type='text/html')

urlpatterns = [path('admin/', admin.site.urls), path('api/', include('core.urls')), re_path(r'^(?!api/|admin/|static/).*$', spa)]
