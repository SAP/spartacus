#!/bin/bash

# List of files for packages to be released
FILES=$(find core-libs feature-libs integration-libs projects -name package.json -not -path "*node_modules*" -not -path "*projects/eslint*")

# Return only the names of the packages from the list of files
PACKAGE_NAMES=()
for file in ${FILES[@]}; do
    PACKAGE_NAMES+=(`awk '/name/{print $2}' $file | awk -F[\/,\"] '{print $3}'`)
done

# Format the names of packages to be delimited by a space so the parent script calling this can use them
# e.g "core schematics styles"
FORMATTED_PACKAGE_NAMES=$(printf " %s" "${PACKAGE_NAMES[@]}")
echo "$FORMATTED_PACKAGE_NAMES"
