#!/usr/bin/env sh

ENDPOINT="gilberto-alvarado-spartacus-default.moovweb-edge.io"

function build_spa {
    echo "-----"
    echo "Building Spartacus"
    yarn install && yarn build:libs && yarn build --prod
}

function deploy_spa {
    echo "-----"
    echo "Deploying Spartacus"
    npm i -g @xdn/cli@latest
    ng new spartacus --style=scss --routing=false
    cd spartacus
    ng add @spartacus/schematics --ssr --pwa
    xdn init

    # add CX endpoint to xdn.config.js
    cp ../xdn.config.js .

    # add xdn endpoint to app.module.ts and index.html
    sed s/localhost\:9002/${ENDPOINT}/ src/app/app.module.ts

    sed s/localhost\:9002/${ENDPOINT}/ src/index.html

    cp routes.ts spartacus/

    xdn deploy --branch --token=$XDN_DEPLOY_TOKEN
}

# deploy_spa
