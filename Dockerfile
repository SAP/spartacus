FROM node:10 as build-stage
WORKDIR /opt/app
COPY . /opt/app
RUN yarn install \
    # additional step: build libs
    && yarn build:core:lib \
    # additional step: use CI server for PROD builds
    && cp projects/storefrontapp/src/environments/environment.ci.ts projects/storefrontapp/src/environments/environment.prod.ts \
    && yarn build \
    && yarn build:ssr


FROM nginx:alpine as front-only
COPY docker/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /opt/app/dist/storefrontapp/ .


FROM nginx:alpine as ssr-front
COPY docker/nginx.ssr.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /opt/app/dist/storefrontapp/ .


FROM keymetrics/pm2:10-alpine as ssr-back
WORKDIR /opt/app
COPY --from=build-stage /opt/app/dist/storefrontapp/ /opt/app/dist/storefrontapp/
COPY --from=build-stage /opt/app/dist/ssr/ /opt/app/dist/ssr/
CMD [ "pm2-runtime", "dist/ssr/server.js" ]
