#!/usr/bin/env bash

set -euo pipefail

TAG_NAME="testsampledata"
PREFIX="spartacussampledata"
SAMPLE_DATA_UNRELEASED_BRANCH="release/2211.x"
UNRELEASED_SPARTACUS_VERSION_NAME="$PREFIX-version-2211-x"

download_file() {
  local url="$1"
  local output="$2"

  echo "Downloading $output ..."
  curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" \
       -L --fail --retry 3 --retry-delay 2 \
       -o "$output" "$url"

  if [ $? -ne 0 ]; then
    echo "Download failed: $url"
    exit 1
  fi

  file_type=$(file --brief --mime-type "$output")
  if [[ "$output" == *.zip && "$file_type" != "application/zip" ]]; then
    echo " $output is not a valid ZIP file (type: $file_type)"
    exit 1
  fi
  if [[ "$output" == *.tar.gz && "$file_type" != "application/gzip" ]]; then
    echo "$output is not a valid TAR.GZ file (type: $file_type)"
    exit 1
  fi

  echo "Successfully downloaded and validated $output"
}

echo "-----"
echo "Downloading current sample data for 2211.x"

download_file \
  "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_UNRELEASED_BRANCH.zip" \
  "$UNRELEASED_SPARTACUS_VERSION_NAME.zip"

download_file \
  "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_UNRELEASED_BRANCH.tar.gz" \
  "$UNRELEASED_SPARTACUS_VERSION_NAME.tar.gz"

echo "-----"
echo "Deleting existing tag (if any)"

git push "https://$GH_TOKEN@github.com/SAP-samples/cloud-commerce-sample-setup.git" :refs/tags/$TAG_NAME || true

echo "-----"
echo "Creating a new release"

gh release create "$TAG_NAME" \
  --repo SAP-samples/cloud-commerce-sample-setup \
  --title "Spartacus Sample Data" \
  --notes "Spartacus sample data releases:\n2211-x: current release"

echo "-----"
echo "Uploading assets to the release"

gh release upload "$TAG_NAME" \
  "$UNRELEASED_SPARTACUS_VERSION_NAME.zip" \
  "$UNRELEASED_SPARTACUS_VERSION_NAME.tar.gz" \
  --repo SAP-samples/cloud-commerce-sample-setup \
  --clobber
