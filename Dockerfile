FROM node

WORKDIR /developer/nodejs/flights_api

COPY . .

RUN npm ci

CMD ["npm","run","dev"]

