#!/usr/bin/env bash

APP="upp-cli"

function download_cli {
    echo "-----"
    echo "Downloading cli"

    curl -u $GH_USER:$GH_TOKEN -L -H "Accept: application/octet-stream" \
        "https://github.tools.sap/api/v3/repos/cx-commerce/upscale-partner-platform-cli/releases/assets/6121" -o ${APP}.zip
}

function install_cli {
    echo "-----"
    echo "Installing cli"

    unzip -o ${APP}.zip -d ${APP}
    cd ${APP}
    npm run install-cli
}

function config_cli {
    echo "-----"
    echo "Configuring cli"

    upp config -z -t ${UPP_TENANT} -c ${UPP_CLIENT} -s ${UPP_SECRET} -r us10 -i 3 -a us10.stage.upp.upscalecommerce.com
}

function build_spa {
    echo "-----"
    echo "Building Spartacus"
    yarn install && yarn build:libs && yarn build:prod
}

function deploy_spa {
    echo "-----"
    echo "Deploying Spartacus"
    upp application deploy -s ./dist -e stage
}

download_cli
install_cli
