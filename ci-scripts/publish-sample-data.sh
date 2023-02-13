#!/usr/bin/env bash

TAG_NAME="sampledata"
SAMPLE_DATA_ASSETS_FOLDER="sample-data-assets"
STOREFRONT_FILE_NAME="spartacussampledata"

SAMPLE_DATA_UNRELEASED_BRANCH="release/5.x"
UNRELEASED_SPARTACUS_VERSION_NAME="$STOREFRONT_FILE_NAME-version-5-x"

SAMPLE_DATA_CURRENT_BRANCH="release/4.x"
CURRENT_RELEASE_SPARTACUS_VERSION_NAME="$STOREFRONT_FILE_NAME-version-4-x"

SAMPLE_DATA_PREVIOUS_BRANCH="release/3.x"
PREVIOUS_RELEASE_SPARTACUS_VERSION_NAME="$STOREFRONT_FILE_NAME-version-3-x"


function download_sample_data_from_spartacussample_repo {
    curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$1.zip" -o "$2.zip"
    curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$1.tar.gz" -o "$2.tar.gz"
}

echo "-----"
echo "Downloading UNRELEASED sample data for 5.x"

download_sample_data_from_spartacussample_repo $SAMPLE_DATA_UNRELEASED_BRANCH $UNRELEASED_SPARTACUS_VERSION_NAME

echo "-----"
echo "Downloading CURRENT sample data for 4.x"

download_sample_data_from_spartacussample_repo $SAMPLE_DATA_CURRENT_BRANCH $CURRENT_RELEASE_SPARTACUS_VERSION_NAME

echo "Downloading PREVIOUS sample data for 3.x"

download_sample_data_from_spartacussample_repo $SAMPLE_DATA_PREVIOUS_BRANCH $PREVIOUS_RELEASE_SPARTACUS_VERSION_NAME

echo "-----"
echo "Move assets to single folder"
rm -rf $SAMPLE_DATA_ASSETS_FOLDER
mkdir $SAMPLE_DATA_ASSETS_FOLDER && mv $STOREFRONT_FILE_NAME* $SAMPLE_DATA_ASSETS_FOLDER

echo "-----"
echo "Deleting tag on the remote repository to remove any tied releases"

git push "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" :refs/tags/$TAG_NAME

echo "-----"
echo "Create a release with created tag"

gh release create $TAG_NAME ./$SAMPLE_DATA_ASSETS_FOLDER/** --repo "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" --title "Spartacus Sample Data"  --notes "Spartacus sample data releases: 
5-x: unreleased 
4-x: current release
3-x: previous release"
