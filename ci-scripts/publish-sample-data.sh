#!/usr/bin/env bash

TAG_NAME="devtestsampledata"
SAMPLE_DATA_UNRELEASED_BRANCH_JDK_17="release/2211.x"
SAMPLE_DATA_UNRELEASED_BRANCH_JDK21="release/221121.x"
UNRELEASED_SPARTACUS_VERSION_NAME_JDK17="spartacussampledata-version-2211-x"
UNRELEASED_SPARTACUS_VERSION_NAME_JDK21="spartacussampledata-version-221121-x"

echo "Downloading current sample data for 2211.x"

function download_sample_data_from_spartacussample_repo {
    curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$1.zip" -o "$2.zip"
    curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$1.tar.gz" -o "$2.tar.gz"
}

download_sample_data_from_spartacussample_repo $SAMPLE_DATA_UNRELEASED_BRANCH_JDK_17 $UNRELEASED_SPARTACUS_VERSION_NAME_JDK17
download_sample_data_from_spartacussample_repo $SAMPLE_DATA_UNRELEASED_BRANCH_JDK21 $UNRELEASED_SPARTACUS_VERSION_NAME_JDK21

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

gh release upload "$TAG_NAME" "$UNRELEASED_SPARTACUS_VERSION_NAME_JDK21.zip" "$UNRELEASED_SPARTACUS_VERSION_NAME_JDK21.tar.gz" "$UNRELEASED_SPARTACUS_VERSION_NAME_JDK17.zip" "$UNRELEASED_SPARTACUS_VERSION_NAME_JDK17.tar.gz" \
  --repo SAP-samples/cloud-commerce-sample-setup \
  --clobber
