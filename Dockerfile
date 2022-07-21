FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

RUN npx tsc --build

COPY ./dist ./dist