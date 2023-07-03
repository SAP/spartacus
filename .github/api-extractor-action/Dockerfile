FROM node:16

COPY package.json /
COPY package-lock.json /

RUN npm i

COPY src/*.ts /
COPY tsconfig.json /

RUN ["npm", "run", "build"]

ENTRYPOINT ["node", "/index.js"]
