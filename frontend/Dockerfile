FROM node:11.15.0

WORKDIR /var/www/frontend

ENV PATH /var/www/frontend/node_modules/.bin:$PATH

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]