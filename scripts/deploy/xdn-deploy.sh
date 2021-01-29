#!/usr/bin/env sh

ENDPOINT="gilberto-alvarado-spartacus-default.moovweb-edge.io"
ANGULAR_CLI_VERSION='~10.1.0'

function deploy_spa {
    npm i -g @angular/cli@${ANGULAR_CLI_VERSION}

    echo "-----"
    echo "Installing xdn cli"
    npm i -g @xdn/cli@latest

    echo "-----"
    echo "Creating new Spartacus shell app"

    ng new spartacus --style=scss --routing=false
    cd spartacus
    ng add @spartacus/schematics --ssr --pwa

    echo "-----"
    echo "Initializing XDN and adding configuration"
    xdn init

    # add CX endpoint to xdn.config.js
    cp ../xdn.config.js .

    # add xdn endpoint to app.module.ts and index.html
    sed s/localhost\:9002/${ENDPOINT}/ src/app/app.module.ts

    sed s/localhost\:9002/${ENDPOINT}/ src/index.html

    cp routes.ts spartacus/

    echo "-----"
    echo "Starting XDN deployment"
    xdn deploy --branch --token=$XDN_DEPLOY_TOKEN
}

deploy_spa
