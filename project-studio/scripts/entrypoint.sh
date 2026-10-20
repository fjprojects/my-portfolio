#!/bin/sh
set -eu
python manage.py migrate --noinput
if [ "${SEED_DEMO:-false}" = "true" ]; then
  python manage.py seed_demo
fi
python manage.py collectstatic --noinput
exec gunicorn config.wsgi:application --bind "0.0.0.0:${PORT:-8000}" --workers 2 --timeout 60
