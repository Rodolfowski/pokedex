FROM node:18.16.1-alpine3.18 as build

WORKDIR /dist/src/app

RUN npm cache clean --force

COPY . .

RUN npm install 

RUN npm run build --prod

FROM nginx:latest

COPY --from=build /dist/src/app/dist/pokedex-layout1 /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80