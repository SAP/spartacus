#!/usr/bin/env bash

TAG_NAME=sampledata
SAMPLE_DATA_ASSETS_FOLDER=sample-data-assets
IS_SAMPLE_DATA_BRANCH=

echo "-----"
echo "Verify LATEST sample data branch exist"

IS_SAMPLE_DATA_BRANCH=`git ls-remote --heads https://${GHT_USER}:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/spartacussampledata.git $SAMPLE_DATA_NEW`

if [ -z "$IS_SAMPLE_DATA_BRANCH" ]; then
    echo "Error downloading $SAMPLE_DATA_NEW zip/tar. Verify branch name exist on the sample data repository"
    exit 1
fi

echo "-----"
echo "Verify PREVIOUS sample data branch exist"

IS_SAMPLE_DATA_BRANCH=`git ls-remote --heads https://${GHT_USER}:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/spartacussampledata.git $SAMPLE_DATA_OLD`

if [ -z "$IS_SAMPLE_DATA_BRANCH" ]; then
    echo "Error downloading $SAMPLE_DATA_OLD zip/tar. Verify branch name exist on the sample data repository"
    exit 1
fi

echo "-----"
echo "Downloading LATEST sample data for 5.0"

curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_NEW.zip" -o "spartacussampledata-current.zip"
curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_NEW.tar.gz" -o "spartacussampledata-current.tar.gz"

echo "Downloading PREVIOUS supported sample data for <= 4.3.x"

curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_OLD.zip" -o "spartacussampledata-previous.zip"
curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_OLD.tar.gz" -o "spartacussampledata-previous.tar.gz"

echo "-----"
echo "Move assets to single folder"
rm -rf $SAMPLE_DATA_ASSETS_FOLDER
mkdir $SAMPLE_DATA_ASSETS_FOLDER && mv spartacussampledata-* $SAMPLE_DATA_ASSETS_FOLDER

echo "-----"
echo "Deleting tag on the remote repository to remove any tied releases"

git push "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" :refs/tags/$TAG_NAME

echo "-----"
echo "Create a release with created tag"

gh release create $TAG_NAME ./$SAMPLE_DATA_ASSETS_FOLDER/**  --notes "Spartacus sample data releases" --repo "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git"
