#!/usr/bin/env bash
set -xe

B2C_STORE="spartacusstore"
B2B_STORE="b2bspastore"

echo "-----"
echo "Verify source branch exist"

IS_BRANCH=`git ls-remote --heads origin $SOURCE_BRANCH_TO_DEPLOY`

if [ -z "$IS_BRANCH" ]; then
    echo "Error downloading $SOURCE_BRANCH_TO_DEPLOY zip/tar. Verify branch name exist on the public Spartacus repository"
    exit 1
fi

echo "-----"
echo "Verify CCv2 branch exist"

IS_BRANCH=`git ls-remote --heads https://$GHT_USER:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/ccv2-ec-dev-project-for-tests.git $CCV2_BRANCH`

if [ -z "$IS_BRANCH" ]; then
    echo "Error downloading $CCV2_BRANCH zip/tar. Verify branch name exist on the ccv2 repository"
    exit 1
fi

echo "-----"
echo "Comment out occBaseUrl from configration to allow index.html meta tag to set the occBaseUrl"

sed -i 's/baseUrl: environment.occBaseUrl/\/\/ baseUrl: environment.occBaseUrl/gi' projects/storefrontapp/src/app/app.module.ts

echo "-----"
echo "Verify app.module.ts has occBaseUrl commented"

cat projects/storefrontapp/src/app/app.module.ts

if grep -Fq "// baseUrl: environment.occBaseUrl" projects/storefrontapp/src/app/app.module.ts
then
    echo "Base url has been successfully commented out from app.module.ts"
else
    echo "Base url is not commented out from app.module.ts"
    exit 1
fi

echo "-----"
echo "Build Spartacus libraries"
yarn build:libs

echo "-----"
echo "Build SSR"

# to change
yarn build:ssr:ci

echo "-----"
echo "Build CSR"

yarn build

echo "-----"
echo "Clone ccv2 repository"

git clone -b spa_p4_dist_test https://$GHT_USER:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/$GHT_REPO.git

echo "-----"
echo "Updating js-storefront to adhere to the ccv2 dist strucutre"

cd "$GHT_REPO/js-storefront"
rm -rf $B2C_STORE
rm -rf $B2B_STORE

mkdir -p $B2C_STORE/dist/$B2C_STORE/browser
mkdir -p $B2C_STORE/dist/$B2C_STORE/server

# only b2c for now test
# mkdir -p $B2B_STORE/dist/$B2B_STORE/browser
# mkdir -p $B2B_STORE/dist/$B2B_STORE/server

cd -

echo "-----"
echo "Copy server and browser files to js-storefront to adhere to the ccv2 dist structure"

cp -a dist/storefrontapp/. $GHT_REPO/js-storefront/$B2C_STORE/dist/$B2C_STORE/browser/
cp -a dist/storefrontapp-server/. $GHT_REPO/js-storefront/$B2C_STORE/dist/$B2C_STORE/server/

echo "-----"
echo "Push to remote repository"

cd $GHT_REPO

git config --global user.email louis.pierrestiger@sap.com
git config --global user.name team-griffin-serviceuser

git add .
git commit -m "update from source"
git push
