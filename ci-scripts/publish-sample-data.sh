#!/usr/bin/env bash

set -euo pipefail

TAG_NAME="testsampledata"
SAMPLE_DATA_UNRELEASED_BRANCH="release/2211.x"
UNRELEASED_SPARTACUS_VERSION_NAME="spartacussampledata-version-2211-x"

ZIP_FILE="$UNRELEASED_SPARTACUS_VERSION_NAME.zip"
TAR_FILE="$UNRELEASED_SPARTACUS_VERSION_NAME.tar.gz"

echo "Downloading current sample data for 2211.x"

curl -sSL -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" \
  -o "$ZIP_FILE" \
  "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_UNRELEASED_BRANCH.zip"

curl -sSL -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" \
  -o "$TAR_FILE" \
  "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_UNRELEASED_BRANCH.tar.gz"

echo "-----"
echo "Validating downloaded files"

ZIP_TYPE=$(file -b "$ZIP_FILE")
TAR_TYPE=$(file -b "$TAR_FILE")

echo "$ZIP_FILE is: $ZIP_TYPE"
echo "$TAR_FILE is: $TAR_TYPE"

if [[ "$ZIP_TYPE" != *"Zip archive data"* ]]; then
  echo "$ZIP_FILE is not a valid ZIP archive."
  echo "First few lines of the file:"
  head "$ZIP_FILE"
  exit 1
fi

if [[ "$TAR_TYPE" != *"gzip compressed data"* ]]; then
  echo "$TAR_FILE is not a valid tar.gz archive."
  echo "First few lines of the file:"
  head "$TAR_FILE"
  exit 1
fi

echo "✅ Both files are valid archives."

# echo "-----"
# echo "Deleting existing tag (if any)"

# git push "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" :refs/tags/$TAG_NAME || true

# echo "-----"
# echo "Creating a new release"

# gh release create "$TAG_NAME" \
#   --repo SAP-samples/cloud-commerce-sample-setup \
#   --title "Spartacus Sample Data" \
#   --notes "Spartacus sample data releases:\n2211-x: current release"

# echo "-----"
# echo "Uploading assets to the release"

# gh release upload "$TAG_NAME" "$ZIP_FILE" "$TAR_FILE" \
#   --repo SAP-samples/cloud-commerce-sample-setup \
#   --clobber
