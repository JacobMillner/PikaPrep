FROM node:11.15

RUN apt-get update

WORKDIR /var/www/frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]