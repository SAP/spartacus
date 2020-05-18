FROM node:12

LABEL "com.github.actions.name"="Vercel Deployment"
LABEL "com.github.actions.description"="This action make a deployment with github actions instead of Vercel github integration"
LABEL "com.github.actions.icon"="check"
LABEL "com.github.actions.color"="black"

COPY package.json /
COPY yarn.lock /
COPY . .

RUN yarn

ENTRYPOINT ["node", "/index.js"]
