FROM node:12

RUN cp package.json yarn.lock / \
&& yarn \
&& cp src/*.ts / \
&& cp tsconfig.json / \
&& yarn build

ENTRYPOINT ["node", "/index.js"]
