#!/usr/bin/env bash

TAG_NAME=sampledata
SAMPLE_DATA_ASSETS_FOLDER=sample-data-assets
IS_SAMPLE_DATA_BRANCH_OR_TAGS=

echo "-----"
echo "Verify UNRELEASED sample data branch or tag exists"

IS_SAMPLE_DATA_BRANCH_OR_TAGS=`git ls-remote --heads --tags https://$GHT_USER:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/spartacussampledata.git $SAMPLE_DATA_UNRELEASED`

if [ -z "$IS_SAMPLE_DATA_BRANCH_OR_TAGS" ]; then
    echo "Error downloading $SAMPLE_DATA_UNRELEASED zip/tar. Verify branch/tag name exist on the spartacus sample data repository"
    exit 1
fi

echo "-----"
echo "Verify CURRENT sample data branch or tag exists"

IS_SAMPLE_DATA_BRANCH_OR_TAGS=`git ls-remote --heads --tags https://$GHT_USER:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/spartacussampledata.git $SAMPLE_DATA_CURRENT`

if [ -z "$IS_SAMPLE_DATA_BRANCH_OR_TAGS" ]; then
    echo "Error downloading $SAMPLE_DATA_CURRENT zip/tar. Verify branch/tag name exist on the spartacus sample data repository"
    exit 1
fi

echo "-----"
echo "Verify PREVIOUS sample data branch or tag exists"

IS_SAMPLE_DATA_BRANCH_OR_TAGS=`git ls-remote --heads --tags https://$GHT_USER:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/spartacussampledata.git $SAMPLE_DATA_PREVIOUS`

if [ -z "$IS_SAMPLE_DATA_BRANCH_OR_TAGS" ]; then
    echo "Error downloading $SAMPLE_DATA_PREVIOUS zip/tar. Verify branch/tag name exist on the spartacus sample data repository"
    exit 1
fi

echo "-----"
echo "Downloading UNRELEASED sample data for 5.x"

curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_UNRELEASED.zip" -o "storefront-toolset-sampledata-version-5-x.zip"
curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_UNRELEASED.tar.gz" -o "storefront-toolset-sampledata-version-5-x.tar.gz"

echo "-----"
echo "Downloading CURRENT sample data for 4.x"

curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_CURRENT.zip" -o "storefront-toolset-sampledata-version-4-x.zip"
curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_CURRENT.tar.gz" -o "storefront-toolset-sampledata-version-4-x.tar.gz"


echo "Downloading PREVIOUS sample data for 3.x"

curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_PREVIOUS.zip" -o "storefront-toolset-sampledata-version-3-x.zip"
curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_PREVIOUS.tar.gz" -o "storefront-toolset-sampledata-version-3-x.tar.gz"

echo "-----"
echo "Move assets to single folder"
rm -rf $SAMPLE_DATA_ASSETS_FOLDER
mkdir $SAMPLE_DATA_ASSETS_FOLDER && mv storefront-toolset-sampledata-* $SAMPLE_DATA_ASSETS_FOLDER

echo "-----"
echo "Deleting tag on the remote repository to remove any tied releases"

git push "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" :refs/tags/$TAG_NAME

echo "-----"
echo "Create a release with created tag"

gh release create $TAG_NAME ./$SAMPLE_DATA_ASSETS_FOLDER/** --repo "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" --title "Spartacus Sample Data"  --notes "Headless Storefront Toolset sample data releases: 
5-x: unreleased 
4-x: current release
3-x: previous release"
