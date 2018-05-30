#!/bin/bash
set -e

ARTIFACT="storefrontshellapp"
DESTDIR="./dist/${ARTIFACT}"

# Deletes $DESTDIR if it extits
if [ -d "$DESTDIR" ]; then
  rm -rf ${DESTDIR}
fi

# Create $DESTDIR
if [ ! -d "$DESTDIR" ]; then
  mkdir -p ${DESTDIR}
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

# copy the storefrontapp folder
mkdir -p ${DESTDIR}/projects
cp -r ./projects/storefrontapp ${DESTDIR}/projects

echo "Updating configuration"
node configure-storefrontshellapp.js ${DESTDIR}

echo "Creating $DESTDIR.tgz"
( cd dist && tar -zcf ${ARTIFACT}.tgz ${ARTIFACT} )
