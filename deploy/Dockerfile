FROM cdsx.docker.repositories.sap.ondemand.com/cdsx/argonauts/node:10.9.0-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm install
RUN npm install -g @angular/cli

COPY . /app

RUN yarn build:core:lib
RUN yarn build

EXPOSE 4200

USER node

CMD ng serve --host 0.0.0.0 --proxy-config mock-server/proxy.backend.js --disable-host-check