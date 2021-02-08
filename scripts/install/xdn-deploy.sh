#!/usr/bin/env bash

ENDPOINT="gilberto-alvarado-spartacus-default.moovweb-edge.io"
ANGULAR_CLI_VERSION='~10.1.0'
APP_HOME="/tmp/spartacus-latest/apps/csr"

function deploy_spa {
    echo "-----"
    echo "Installing angular cli (${ANGULAR_CLI_VERSION})"
    npm i -g @angular/cli@${ANGULAR_CLI_VERSION}

    echo "-----"
    echo "Installing xdn cli (latest)"
    npm i -g @xdn/cli@latest

    echo "-----"
    echo "Building and installing Spartacus from libs"

    ./run.sh install
    cd /tmp/spartacus-latest

    echo "-----"
    echo "Initializing XDN and adding configuration"
    xdn init

    # add CX endpoint to xdn.config.js
    cd -
    cp ./xdn.config.js ${APP_HOME}
    cp ./routes.ts ${APP_HOME}
    cd ${APP_HOME}

    # add xdn endpoint to app.module.ts and index.html
    sed s/localhost\:9002/${ENDPOINT}/ src/app/app.module.ts

    sed s/localhost\:9002/${ENDPOINT}/ src/index.html

    echo "-----"
    echo "Starting XDN deployment"
    xdn deploy --branch --token=$XDN_DEPLOY_TOKEN
}

deploy_spa
