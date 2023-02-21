FROM node:19.6.0-bullseye-slim as builder

RUN mkdir /project
WORKDIR /project

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["node", "index.js"]