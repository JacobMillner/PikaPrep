FROM node:11.15.0

WORKDIR /var/www/frontend

ENV PATH /var/www/frontend/node_modules/.bin:$PATH

COPY package.json /var/www/frontend/package.json ./

COPY . .

RUN npm install --silent

EXPOSE 3000

CMD ["npm", "start"]
