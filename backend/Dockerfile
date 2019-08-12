FROM python:3

RUN apt-get update
RUN pip3 install --upgrade pip

WORKDIR /var/www/backend

COPY requirements.txt ./

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8888

CMD python ./src/server.py