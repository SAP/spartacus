#!/bin/bash
set -e

# Using work dir dist/storefrontshellapp to avoid name collision with dist/storefrontapp
WORK_DIR="./dist/storefrontshellapp"
APP_NAME="storefrontapp"
DESTDIR="${WORK_DIR}/$APP_NAME"

# Deletes $DESTDIR if it exists
if [ -d "$DESTDIR" ]; then
  echo "Deleting $DESTDIR"
  rm -rf ${DESTDIR}
fi

# Create $DESTDIR
if [ ! -d "$DESTDIR" ]; then
  echo "Creating $DESTDIR"
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
cp -r ./projects/${APP_NAME} ${DESTDIR}/projects

echo "Updating configuration"
node configure-shellapp.js ${DESTDIR}

echo "Creating ${WORK_DIR}/${APP_NAME}.tgz"
(cd ${WORK_DIR} && tar -zcf ${APP_NAME}.tgz ${APP_NAME})
