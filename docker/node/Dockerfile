FROM node:lts-bullseye-slim

RUN apt-get update && apt-get install -y
RUN apt-get install vim less -y
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

RUN mkdir -p /client
WORKDIR /client

COPY /client/package.json /client/
COPY /client/package-lock.json /client/

RUN npm install -g npm@latest
RUN npm install -g ts-node
RUN npm install -g typescript
RUN npm install -g react-scripts
RUN npm install -g create-react-app

RUN npm install

COPY . /client/

EXPOSE 3000