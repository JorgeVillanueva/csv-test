FROM alpine:latest
RUN apk add nodejs npm mongodb-tools
WORKDIR /app
COPY . /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8080
CMD ["node", "app.js"]