FROM node:alpine3.10


WORKDIR /app


COPY package*.json . 


RUN npm install


COPY . .


CMD ["sh", "-c", "npm run build && npm start"]
