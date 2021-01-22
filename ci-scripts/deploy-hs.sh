#!/usr/bin/env bash

APP="upp-cli"

function download_cli {
    echo "Downloading cli"

    curl -u $GH_USER:$GH_TOKEN -L -H "Accept: application/octet-stream" \
        "https://github.tools.sap/api/v3/repos/cx-commerce/upscale-partner-platform-cli/releases/assets/6121" -o ${APP}.zip
}

function install_cli {
    echo "Installing cli"

    # temporary step. Delete it when asset can be downloaded.
    cp ~/sandbox/node/${APP}.zip .
    unzip -o ${APP}.zip -d ${APP}
    cd ${APP}
    npm run install-cli
}

download_cli
install_cli
