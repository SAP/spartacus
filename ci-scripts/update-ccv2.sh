#!/usr/bin/env bash
set -xe

B2C_STORE="spartacusstore"
B2B_STORE="b2bspastore"
CCV2_B2C_STOREFRONT_PATH="$GHT_REPO/js-storefront/$B2C_STORE"
CCV2_B2B_STOREFRONT_PATH="$GHT_REPO/js-storefront/$B2B_STORE"
GH_BASE_URL="https://$GHT_USER:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/$GHT_REPO.git"
APP_MODULE_PATH="projects/storefrontapp/src/app/app.module.ts"
B2C_CONFIG_PATH="projects/storefrontapp/src/app/spartacus/spartacus-b2c-configuration.module.ts"
B2B_CONFIG_PATH="projects/storefrontapp/src/app/spartacus/spartacus-b2b-configuration.module.ts"
SERVER_CONFIG_PATH="projects/storefrontapp/server.ts"

function verify_branch_exist {
    IS_BRANCH=$(git ls-remote --heads "$1" "$2")

    if [ -z "$IS_BRANCH" ]; then
        echo "Error. Can't find the branch $2. Verify the branch name exist"
        exit 1
    fi
}

function remove_pwa_config {
    sed -i '/pwa:[[:blank:]]*{/,/^[[:space:]]*}/d' "$1"

    cat "$1"

    if grep -Fq "addToHomeScreen: true" "$1"
    then
        echo "PWA config has NOT been removed"
        exit 1
    else
        echo "PWA config has SUCCESSFULLY been removed"
    fi
}

function copy_browser_and_server_files {
    cp -a dist/storefrontapp/. "$1/dist/$2/browser/"
    cp -a dist/storefrontapp-server/. "$1/dist/$2/server/"
}

echo "------------------------------------------------------------------"
echo "Verify source branch exist"

verify_branch_exist "origin" "$SOURCE_BRANCH_TO_DEPLOY"

echo "------------------------------------------------------------------"
echo "Verify CCv2 branch exist"

verify_branch_exist "$GH_BASE_URL" "$CCV2_BRANCH"

echo "------------------------------------------------------------------"
echo "Comment out occBaseUrl from configration to allow index.html meta tag to set the occBaseUrl"

sed -i 's/baseUrl: environment.occBaseUrl/\/\/ baseUrl: environment.occBaseUrl/gi' "$APP_MODULE_PATH"

cat "$APP_MODULE_PATH"

if grep -Fq "// baseUrl: environment.occBaseUrl" "$APP_MODULE_PATH"
then
    echo "Base url has been successfully commented out from app.module.ts"
else
    echo "Base url is not commented out from app.module.ts"
    exit 1
fi

echo "------------------------------------------------------------------"
echo "Remove pwa config for B2C storefront"

remove_pwa_config "$B2C_CONFIG_PATH"

echo "------------------------------------------------------------------"
echo "Remove pwa config for B2B storefront"

remove_pwa_config "$B2B_CONFIG_PATH"

echo "------------------------------------------------------------------"
echo "Clone ccv2 repository"

git clone -b "$CCV2_BRANCH" "$GH_BASE_URL"

echo "------------------------------------------------------------------"
echo "Update ccv2 repo's js-storefront folder to adhere to the ccv2 dist strucutre"

rm -rf "$CCV2_B2C_STOREFRONT_PATH"
rm -rf "$CCV2_B2B_STOREFRONT_PATH"

# b2c
mkdir -p "$CCV2_B2C_STOREFRONT_PATH/dist/$B2C_STORE/browser"
mkdir -p "$CCV2_B2C_STOREFRONT_PATH/dist/$B2C_STORE/server"

# b2b
mkdir -p "$CCV2_B2B_STOREFRONT_PATH/dist/$B2B_STORE/browser"
mkdir -p "$CCV2_B2B_STOREFRONT_PATH/dist/$B2B_STORE/server"

echo "------------------------------------------------------------------"
echo "Build Spartacus libraries"
yarn build:libs

echo "------------------------------------------------------------------"
echo "update server.ts for B2C storefront"

sed -i "s%dist/storefrontapp%dist/$B2C_STORE/browser%gi" "$SERVER_CONFIG_PATH"

echo "------------------------------------------------------------------"
echo "Verify server.ts has been updated for B2C dist"

cat "$SERVER_CONFIG_PATH"

if grep -Fq "const distFolder = join(process.cwd(), 'dist/$B2C_STORE/browser');" "$SERVER_CONFIG_PATH"
then
    echo "Dist folder has been updated"
else
    echo "Dist folder has NOT been updated"
    exit 1
fi

echo "------------------------------------------------------------------"
echo "Build SSR for B2C storefront"

yarn build:ssr:ci

echo "------------------------------------------------------------------"
echo "Build CSR for B2C storefront"

yarn build

echo "------------------------------------------------------------------"
echo "Copy server and browser files to js-storefront to adhere to the ccv2 dist structure for B2C storefront"

copy_browser_and_server_files "$CCV2_B2C_STOREFRONT_PATH" "$B2C_STORE"

echo "------------------------------------------------------------------"
echo "update server.ts for B2B storefront"

sed -i "s%dist/$B2C_STORE/browser%dist/$B2B_STORE/browser%gi" "$SERVER_CONFIG_PATH"

echo "------------------------------------------------------------------"
echo "Verify server.ts has been updated for B2B dist"

cat "$SERVER_CONFIG_PATH"

if grep -Fq "const distFolder = join(process.cwd(), 'dist/$B2B_STORE/browser');" "$SERVER_CONFIG_PATH"
then
    echo "Dist folder has been updated"
else
    echo "Dist folder has NOT been updated"
    exit 1
fi

echo "------------------------------------------------------------------"
echo "Build SSR for B2B storefront"

export SPA_ENV='b2b'
yarn build:ssr:ci

echo "------------------------------------------------------------------"
echo "Build CSR for B2B storefront"

yarn build

echo "------------------------------------------------------------------"
echo "Copy server and browser files to js-storefront to adhere to the ccv2 dist structure for B2B storefront"

copy_browser_and_server_files "$CCV2_B2B_STOREFRONT_PATH" "$B2B_STORE"

echo "------------------------------------------------------------------"
echo "Push to remote repository"

cd "$GHT_REPO"

git config --global user.email "$GHT_CCV2_EMAIL"
git config --global user.name "$GHT_CCV2_USERNAME"

git add .
git commit --allow-empty -m "Update with $SOURCE_BRANCH_TO_DEPLOY branch from source of Spartacus" 
git push
