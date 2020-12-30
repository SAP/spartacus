FROM node:12

LABEL "com.github.actions.name"="Cache builded libs"
LABEL "com.github.actions.description"="Cache dist directory with libraries builds"
LABEL "com.github.actions.icon"="lock"
LABEL "com.github.actions.color"="red"

COPY package.json /
COPY yarn.lock /
COPY index.ts /
COPY tsconfig.json /

RUN yarn
RUN ["yarn", "build"]

ENTRYPOINT ["node", "/index.js"]
