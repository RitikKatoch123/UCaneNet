FROM nvidia/cuda:11.2.2-cudnn8-runtime-ubuntu20.04

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    python3-pip \
    python3 \
    unzip \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN pip install kaggle gunicorn

ENV KAGGLE_USERNAME=""
ENV KAGGLE_KEY=""

RUN mkdir -p /root/.kaggle \
    && echo "{\"username\": \"$KAGGLE_USERNAME\", \"key\": \"$KAGGLE_KEY\"}" > /root/.kaggle/kaggle.json

RUN ln -s /usr/local/bin/kaggle /usr/bin/kaggle \
    && ln -s /usr/local/bin/gunicorn /usr/bin/gunicorn

RUN which kaggle
RUN which gunicorn

WORKDIR /backend
COPY backend/ ./ 

RUN mkdir -p /backend/dataset \
    && cd /backend/dataset \
    && kaggle datasets download nirmalsankalana/sugarcane-leaf-disease-dataset --force

RUN find /backend/dataset -type f -name '*.zip' -delete

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python3", "app.py"]
