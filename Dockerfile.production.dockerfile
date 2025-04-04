FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    && apt-get clean

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

# CMD ["sh", "-c", "python app/manage.py migrate && python app/manage.py runserver 0.0.0.0:8000"]
CMD ["sh", "-c", "python app/manage.py collectstatic --noinput && python app/manage.py migrate && python app/manage.py runserver 0.0.0.0:8000"]
