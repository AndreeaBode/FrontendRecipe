FROM node:latest as builder
COPY . /app
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm run ng build

FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/ass .