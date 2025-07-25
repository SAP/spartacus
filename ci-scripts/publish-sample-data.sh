#!/usr/bin/env bash

TAG_NAME="testsampledata"
SAMPLE_DATA_UNRELEASED_BRANCH="release/2211.x"
UNRELEASED_SPARTACUS_VERSION_NAME="spartacussampledata-version-2211-x"

echo "Validating GHT_PRIVATE_REPO_TOKEN..."

VALIDATION_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" \
  https://github.tools.sap/api/v3/user)

if [[ "$VALIDATION_STATUS" != "200" ]]; then
  echo "Invalid or unauthorized GHT_PRIVATE_REPO_TOKEN (status: $VALIDATION_STATUS)"
  exit 1
else
  echo "Token is valid (status: $VALIDATION_STATUS)"
fi

echo "Downloading current sample data for 2211.x"

curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" \
  -L "https://github.tools.sap/cx-commerce/spartacussampledata/archive/$SAMPLE_DATA_UNRELEASED_BRANCH.zip" \
  -o "$UNRELEASED_SPARTACUS_VERSION_NAME.zip"

curl -H "Authorization: token $GHT_PRIVATE_REPO_TOKEN" \
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
  --notes "Spartacus sample data releases:\n2211-x: current release"

echo "-----"
echo "Uploading assets to the release"

gh release upload "$TAG_NAME" "$UNRELEASED_SPARTACUS_VERSION_NAME.zip" "$UNRELEASED_SPARTACUS_VERSION_NAME.tar.gz" \
  --repo SAP-samples/cloud-commerce-sample-setup \
  --clobber
