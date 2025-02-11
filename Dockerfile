# Use an nodejs runtime as a o.g parent image
FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5003

CMD ["node", "./src/server.js"]


