FROM alpine:3.19

ENV NODE_VERSION 20.13.1
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "node" "dist/index.js" ]