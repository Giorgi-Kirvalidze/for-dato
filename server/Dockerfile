FROM node:18-alpine3.17 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080


##############
# PRODUCTION #
##############
# Build another image named production
FROM node:18-alpine3.17 AS production

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}
