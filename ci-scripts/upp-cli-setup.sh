#!/usr/bin/env bash
set -o errexit
set -o nounset

APP="upp-cli"

echo "-----"
echo "Downloading upp cli zip"

curl -u ${GHT_USER}:${GHT_TOKEN} -L -H "Accept: application/octet-stream" \
    "https://github.tools.sap/api/v3/repos/cx-commerce/upscale-partner-platform-cli/releases/assets/7203" -o ${APP}.zip

if [ ! -s ${APP}.zip ]; then
    echo "Error downloading upp CLI zip. Check url and configs"
    exit 1
fi

echo "-----"
echo "Installing upp cli"

unzip -o ${APP}.zip -d ${APP}
cd ${APP}
npm install
npm run install-cli

cd ..

echo "-----"
echo "Configuring cli"

upp config -z -t ${UPP_TENANT} -c ${UPP_CLIENT} -s ${UPP_SECRET} -r us10 -i 3 -a us10.stage.upp.upscalecommerce.com

echo "-----"
echo "UPP CLI installed and setup."
