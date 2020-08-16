FROM node:14.7.0-alpine3.12
WORKDIR /usr/src/app

RUN apk update && \
  apk add git