FROM python:2

RUN pip install httplib2
RUN pip install requests
RUN pip install git+git://github.com/broadinstitute/cromwell-tools.git@v0.3.1
RUN pip install redis

RUN mkdir -p /mnt/src
WORKDIR /mnt/src/