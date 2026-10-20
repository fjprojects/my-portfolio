FROM node:22-slim AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY frontend ./frontend
COPY shared ./shared
COPY vite.config.js ./
RUN npm run build:server

FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt
COPY backend ./backend
COPY shared ./shared
COPY --from=frontend /app/dist ./dist
COPY scripts/entrypoint.sh ./entrypoint.sh
RUN useradd --create-home studio && chmod +x /app/entrypoint.sh && chown -R studio:studio /app
USER studio
WORKDIR /app/backend
EXPOSE 8000
ENTRYPOINT ["/app/entrypoint.sh"]
