#!/usr/bin/env bash
set -o errexit
set -o nounset

APP="upp-cli"

echo "-----"
echo "Downloading upp cli zip"

# TODO pull fron NPM once the CLI is published. For now, we can only get it from assets on github releases
curl -u ${GHT_USER}:${GHT_TOKEN} -L -H "Accept: application/octet-stream" \
    "https://github.tools.sap/api/v3/repos/cx-commerce/upscale-partner-platform-cli/releases/assets/10192" -o ${APP}.zip

if [ ! -s ${APP}.zip ]; then
    echo "Error downloading upp CLI zip. Check url and configs"
    exit 1
fi

echo "-----"
echo "Installing upp cli (dependencies)"
unzip -o ${APP}.zip -d ${APP}
cd ${APP}
npm install
chmod -R 777 /github/home/.npm
chmod -R 777 .

echo "-----"
echo "Installing UPP CLI"
npm run install-cli

cd ..

echo "-----"
echo "Configuring cli"

upp config -z -t ${UPP_TENANT} -c ${UPP_CLIENT} -s ${UPP_SECRET} -r us10 -i 3 -a us10.staging.upp.upscalecommerce.com

echo "-----"
echo "UPP CLI installed and ready."