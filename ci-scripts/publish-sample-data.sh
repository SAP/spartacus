#!/usr/bin/env bash

TAG_NAME="sampledata"
SAMPLE_DATA_UNRELEASED_BRANCH="release/2211.x"
UNRELEASED_SPARTACUS_VERSION_NAME="spartacussampledata-version-2211-x"

echo "Downloading current sample data for 2211.x"

curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN_RM_PAT" \
  -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_UNRELEASED_BRANCH.zip" \
  -o "$UNRELEASED_SPARTACUS_VERSION_NAME.zip"

curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN_RM_PAT" \
  -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_UNRELEASED_BRANCH.tar.gz" \
  -o "$UNRELEASED_SPARTACUS_VERSION_NAME.tar.gz"

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
