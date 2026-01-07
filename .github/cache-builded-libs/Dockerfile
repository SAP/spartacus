FROM node:22

COPY package.json /
COPY package-lock.json /

RUN npm i

COPY index.ts /
COPY tsconfig.json /

RUN ["npm", "run", "build"]

ENTRYPOINT ["node", "/index.js"]
