FROM node:16.20.2-alpine3.18 as builder

WORKDIR /back

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "start:dev" ]