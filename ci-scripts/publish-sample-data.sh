#!/usr/bin/env bash

TAG_NAME="sampledata"
SAMPLE_DATA_ASSETS_FOLDER="sample-data-assets"
UNRELEASED_SPARTACUS_VERSION_NAME="storefront-toolset-sampledata-version-5-x"
CURRENT_RELEASE_SPARTACUS_VERSION_NAME="storefront-toolset-sampledata-version-4-x"
PREVIOUS_RELEASE_SPARTACUS_VERSION_NAME="storefront-toolset-sampledata-version-3-x"
IS_SAMPLE_DATA_BRANCH_OR_TAGS=

function verify_branch_or_tag_exists {
    IS_SAMPLE_DATA_BRANCH_OR_TAGS=`git ls-remote --heads --tags https://$GHT_USER:$GHT_PRIVATE_REPO_TOKEN@github.tools.sap/cx-commerce/spartacussampledata.git $1`

    if [ -z "$IS_SAMPLE_DATA_BRANCH_OR_TAGS" ]; then
        echo "Error downloading $1 zip/tar. Verify branch/tag name exist on the spartacus sample data repository"
        exit 1
    fi
}

function download_sample_data {
    curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$1.zip" -o "$2.zip"
    curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$1.tar.gz" -o "$2.tar.gz"
}



echo "-----"
echo "Verify UNRELEASED sample data branch or tag exists"

verify_branch_or_tag_exists $SAMPLE_DATA_UNRELEASED

echo "-----"
echo "Verify CURRENT sample data branch or tag exists"

verify_branch_or_tag_exists $SAMPLE_DATA_CURRENT

echo "-----"
echo "Verify PREVIOUS sample data branch or tag exists"

verify_branch_or_tag_exists $SAMPLE_DATA_PREVIOUS

echo "-----"
echo "Downloading UNRELEASED sample data for 5.x"

download_sample_data $SAMPLE_DATA_UNRELEASED $UNRELEASED_SPARTACUS_VERSION_NAME

echo "-----"
echo "Downloading CURRENT sample data for 4.x"

download_sample_data $SAMPLE_DATA_CURRENT $CURRENT_RELEASE_SPARTACUS_VERSION_NAME

echo "Downloading PREVIOUS sample data for 3.x"

download_sample_data $SAMPLE_DATA_PREVIOUS $PREVIOUS_RELEASE_SPARTACUS_VERSION_NAME

echo "-----"
echo "Move assets to single folder"
rm -rf $SAMPLE_DATA_ASSETS_FOLDER
mkdir $SAMPLE_DATA_ASSETS_FOLDER && mv storefront-toolset-sampledata-* $SAMPLE_DATA_ASSETS_FOLDER

echo "-----"
echo "Deleting tag on the remote repository to remove any tied releases"

git push "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" :refs/tags/$TAG_NAME

echo "-----"
echo "Create a release with created tag"

gh release create $TAG_NAME ./$SAMPLE_DATA_ASSETS_FOLDER/** --repo "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" --title "Headless Storefront Toolset Sample Data"  --notes "Headless Storefront Toolset sample data releases: 
5-x: unreleased 
4-x: current release
3-x: previous release"
