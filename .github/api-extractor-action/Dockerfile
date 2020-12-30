FROM node:12

LABEL "com.github.actions.name"="Breaking change detection bot"
LABEL "com.github.actions.description"="Looks for breaking changes in library API"
LABEL "com.github.actions.icon"="lock"
LABEL "com.github.actions.color"="red"

COPY package.json /
COPY yarn.lock /
COPY index.js /
COPY tsconfig.json /

RUN yarn
RUN ['yarn', 'build']

ENTRYPOINT ["node", "/index.js"]
