FROM node:24

COPY package.json /
COPY package-lock.json /

RUN npm ci

COPY src/*.ts /
COPY tsconfig.json /

RUN ["npm", "run", "build"]

ENTRYPOINT ["node", "/index.js"]
