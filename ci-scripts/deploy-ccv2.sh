#!/usr/bin/env bash
set -xe

B2C_STORE="spartacusstore"
B2B_STORE="b2bspastore"
CCV2_B2C_STOREFRONT_PATH="$GHT_REPO/js-storefront/$B2C_STORE"
CCV2_B2B_STOREFRONT_PATH="$GHT_REPO/js-storefront/$B2B_STORE"

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Verify source branch exist"

IS_BRANCH=`git ls-remote --heads origin $SOURCE_BRANCH_TO_DEPLOY`

if [ -z "$IS_BRANCH" ]; then
    echo "Error finding the branch $SOURCE_BRANCH_TO_DEPLOY. Verify the branch name exist on the public Spartacus repository"
    exit 1
fi

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Verify CCv2 branch exist"

IS_BRANCH=`git ls-remote --heads https://$GHT_USER:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/ccv2-ec-dev-project-for-tests.git $CCV2_BRANCH`

if [ -z "$IS_BRANCH" ]; then
    echo "Error finding the branch $CCV2_BRANCH. Verify the branch name exist on the ccv2 repository"
    exit 1
fi

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Comment out occBaseUrl from configration to allow index.html meta tag to set the occBaseUrl"

sed -i 's/baseUrl: environment.occBaseUrl/\/\/ baseUrl: environment.occBaseUrl/gi' projects/storefrontapp/src/app/app.module.ts

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Verify app.module.ts has occBaseUrl commented"

cat projects/storefrontapp/src/app/app.module.ts

if grep -Fq "// baseUrl: environment.occBaseUrl" projects/storefrontapp/src/app/app.module.ts
then
    echo "Base url has been successfully commented out from app.module.ts"
else
    echo "Base url is not commented out from app.module.ts"
    exit 1
fi

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Clone ccv2 repository"

git clone -b $CCV2_BRANCH https://$GHT_USER:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/$GHT_REPO.git

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Update ccv2 repo's js-storefront folder to adhere to the ccv2 dist strucutre"

rm -rf $CCV2_B2C_STOREFRONT_PATH
rm -rf $CCV2_B2B_STOREFRONT_PATH

# b2c
mkdir -p $CCV2_B2C_STOREFRONT_PATH/dist/$B2C_STORE/browser
mkdir -p $CCV2_B2C_STOREFRONT_PATH/dist/$B2C_STORE/server

# b2b
mkdir -p $CCV2_B2B_STOREFRONT_PATH/dist/$B2B_STORE/browser
mkdir -p $CCV2_B2B_STOREFRONT_PATH/dist/$B2B_STORE/server

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Build Spartacus libraries"
yarn build:libs

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "update server.ts for b2c storefront"

sed -i "s%dist/storefrontapp%dist/$B2C_STORE/browser%gi" projects/storefrontapp/server.ts

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Verify server.ts has been updated for b2c dist"

cat projects/storefrontapp/server.ts

if grep -Fq "const distFolder = join(process.cwd(), 'dist/$B2C_STORE/browser');" projects/storefrontapp/server.ts
then
    echo "Dist folder has been updated"
else
    echo "Dist folder has NOT been updated"
    exit 1
fi

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Build SSR for b2c storefront"

yarn build:ssr:ci

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Build CSR for b2c storefront"

yarn build

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Copy server and browser files to js-storefront to adhere to the ccv2 dist structure for b2c storefront"

cp -a dist/storefrontapp/. $CCV2_B2C_STOREFRONT_PATH/dist/$B2C_STORE/browser/
cp -a dist/storefrontapp-server/. $CCV2_B2C_STOREFRONT_PATH/dist/$B2C_STORE/server/

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "update server.ts for b2b storefront"

sed -i "s%dist/$B2C_STORE/browser%dist/$B2B_STORE/browser%gi" projects/storefrontapp/server.ts

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Verify server.ts has been updated for b2b dist"

cat projects/storefrontapp/server.ts

if grep -Fq "const distFolder = join(process.cwd(), 'dist/$B2B_STORE/browser');" projects/storefrontapp/server.ts
then
    echo "Dist folder has been updated"
else
    echo "Dist folder has NOT been updated"
    exit 1
fi

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Build SSR for b2b storefront"

export SPA_ENV='b2b'
yarn build:ssr:ci

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Build CSR for b2b storefront"

yarn build

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Copy server and browser files to js-storefront to adhere to the ccv2 dist structure for b2b storefront"

cp -a dist/storefrontapp/. $CCV2_B2B_STOREFRONT_PATH/dist/$B2B_STORE/browser/
cp -a dist/storefrontapp-server/. $CCV2_B2B_STOREFRONT_PATH/dist/$B2B_STORE/server/

echo "---------------------------------------------------------------------------------------------------------------------------"
echo "Push to remote repository"

cd $GHT_REPO

git config --global user.email louis.pierrestiger@sap.com
git config --global user.name team-griffin-serviceuser

git add .
git commit -m "update from source"
git push
