#!/usr/bin/env bash

echo "-----"
echo "Verify source branch exist"

IS_BRANCH=`git ls-remote --heads origin $SOURCE_BRANCH_TO_DEPLOY`

if [ -z "$IS_BRANCH" ]; then
    echo "Error downloading $SOURCE_BRANCH_TO_DEPLOY zip/tar. Verify branch name exist on the public Spartacus repository"
    exit 1
fi

echo "-----"
echo "Verify CCv2 branch exist"

IS_BRANCH=`git ls-remote --heads https://${GHT_USER}:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/ccv2-ec-dev-project-for-tests.git $CCV2_BRANCH`

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
echo "TBD today"
