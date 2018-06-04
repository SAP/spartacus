#!/bin/bash
set -e

# Using temp dir to avoid name collision with dist/storefrontapp
TEMP_DIR="storefrontshellapp"
DESTDIR="./dist/$TEMP_DIR"

# Deletes $DESTDIR if it exists
if [ -d "$DESTDIR" ]; then
  rm -rf ${DESTDIR}
fi

# Create $DESTDIR
if [ ! -d "$DESTDIR" ]; then
  mkdir -p ${DESTDIR}/projects
fi

echo "Copying files to $DESTDIR"
# Copy individual files
cp .gitignore $DESTDIR
cp angular.json $DESTDIR
cp package.json $DESTDIR
cp prettier-config.prettierrc $DESTDIR
cp tsconfig.json $DESTDIR
cp tslint.json $DESTDIR
cp yarn.lock $DESTDIR

# copy the storefrontapp folder to temp dir
cp -r ./projects/storefrontapp ${DESTDIR}/projects

echo "Updating configuration"
node configure-shellapp.js ${DESTDIR}

echo "Creating storefrontapp.tgz"
(cd dist && tar -zcf storefrontapp.tgz ${TEMP_DIR})
