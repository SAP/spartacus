FROM node:12

COPY package.json /
COPY yarn.lock /

RUN yarn

COPY index.ts /
COPY tsconfig.json /

RUN ["yarn", "build"]

ENTRYPOINT ["node", "/index.js"]
