FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT=13800

EXPOSE 13800

CMD [ "npm", "start" ]