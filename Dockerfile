FROM node

WORKDIR /developer/nodejs/flights-api-service

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm","run","dev"]