#!/bin/bash

# Script to update rbsc-descriptors.yml based on packages found in the repository
# and version from tools/config/const.ts

set -e

# File paths
RBSC_DESCRIPTORS_FILE="rbsc-descriptors.yml"
CONST_FILE="tools/config/const.ts"
RELEASE_PACKAGES_SCRIPT="ci-scripts/release-packages-list-generator.sh"

# Check if required files exist
if [[ ! -f "$CONST_FILE" ]]; then
    echo "Error: $CONST_FILE not found"
    exit 1
fi

if [[ ! -f "$RELEASE_PACKAGES_SCRIPT" ]]; then
    echo "Error: $RELEASE_PACKAGES_SCRIPT not found"
    exit 1
fi

# Extract version from const.ts
VERSION=$(grep "PUBLISHING_VERSION" "$CONST_FILE" | sed "s/.*['\"]\\([^'\"]*\\)['\"].*/\\1/")

if [[ -z "$VERSION" ]]; then
    echo "Error: Could not extract PUBLISHING_VERSION from $CONST_FILE"
    exit 1
fi

echo "Using version: $VERSION"

# Get package names using the existing release packages script
PACKAGE_NAMES_RAW=$(./"$RELEASE_PACKAGES_SCRIPT")

if [[ -z "$PACKAGE_NAMES_RAW" ]]; then
    echo "Error: Could not extract package names from $RELEASE_PACKAGES_SCRIPT"
    exit 1
fi

# Convert space-separated string to array and sort
read -a PACKAGE_NAMES_ARRAY <<< "$PACKAGE_NAMES_RAW"
BUILD_PACKAGES=$(printf '%s\n' "${PACKAGE_NAMES_ARRAY[@]}" | sort)

echo "Found packages:"
echo "$BUILD_PACKAGES"
echo ""

# Generate new rbsc-descriptors.yml
echo "Generating $RBSC_DESCRIPTORS_FILE..."

# Clean up previous content - remove the file and create fresh
rm -f "$RBSC_DESCRIPTORS_FILE"
touch "$RBSC_DESCRIPTORS_FILE"

# Generate entries for each package
while IFS= read -r package; do
    if [[ -n "$package" ]]; then
        cat >> "$RBSC_DESCRIPTORS_FILE" << EOF
- url: https://common.repositories.cloud.sap/artifactory/api/npm/build.releases.npm/@spartacus/${package}/-/${package}-${VERSION}.tgz
  type: npm
  comp: ${package}
EOF
    fi
done <<< "$BUILD_PACKAGES"

echo "Successfully generated $RBSC_DESCRIPTORS_FILE with $(echo "$BUILD_PACKAGES" | wc -l | tr -d ' ') packages"
echo "Done!"
