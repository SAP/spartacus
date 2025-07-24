#!/usr/bin/env bash

TAG_NAME="sampledata"
ASSETS_FOLDER="sample-data-assets"
PREFIX="spartacussampledata"

SAMPLE_DATA_UNRELEASED_BRANCH="release/2211.x"
UNRELEASED_SPARTACUS_VERSION_NAME="$PREFIX-version-2211-x"

function download_sample_data_from_spartacussample_repo {
    curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$1.zip" -o "$2.zip"
    curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$1.tar.gz" -o "$2.tar.gz"
}

echo "-----"
echo "Move all assets to a folder"
rm -rf $ASSETS_FOLDER
mkdir $ASSETS_FOLDER && mv $PREFIX* $ASSETS_FOLDER

echo "-----"
echo "Deleting tag on the remote repository to remove any tied releases"

git push "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" :refs/tags/$TAG_NAME

echo "-----"
echo "Create a new release with tag"

gh release create $TAG_NAME ./$ASSETS_FOLDER/** --repo "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" --title "Spartacus Sample Data"  --notes "Spartacus sample data release: 2211-x (current release)"
