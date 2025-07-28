#!/usr/bin/env bash

TAG_NAME="testsampledata"
SAMPLE_DATA_UNRELEASED_BRANCH="release/2211.x"
UNRELEASED_SPARTACUS_VERSION_NAME="spartacussampledata-version-2211-x"

echo "Downloading current sample data for 2211.x"

function download_sample_data_from_spartacussample_repo {
    curl -H "Authorization: token $RM_TEST" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$1.zip" -o "$2.zip"
    curl -H "Authorization: token $RM_TEST" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$1.tar.gz" -o "$2.tar.gz"
}

download_sample_data_from_spartacussample_repo $SAMPLE_DATA_UNRELEASED_BRANCH $UNRELEASED_SPARTACUS_VERSION_NAME

echo "-----"
echo "Deleting existing tag (if any)"

git push "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" :refs/tags/$TAG_NAME || true

echo "-----"
echo "Creating a new release"

gh release create "$TAG_NAME" \
  --repo SAP-samples/cloud-commerce-sample-setup \
  --title "Spartacus Sample Data" \
  --notes "Spartacus sample data releases: 2211-x (current release)"

echo "-----"
echo "Uploading assets to the release"

gh release upload "$TAG_NAME" "$UNRELEASED_SPARTACUS_VERSION_NAME.zip" "$UNRELEASED_SPARTACUS_VERSION_NAME.tar.gz" \
  --repo SAP-samples/cloud-commerce-sample-setup \
  --clobber
