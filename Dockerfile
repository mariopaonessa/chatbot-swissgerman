FROM python:3.5.2

WORKDIR /usr/src/app

COPY ./ ./
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install git+git://github.com/gunthercox/ChatterBot.git@master

RUN chmod 777 run.sh

ENTRYPOINT ./run.sh