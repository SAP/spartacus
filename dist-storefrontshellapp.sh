#!/bin/bash

DESTDIR="./dist/storefrontshellapp"

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
node generateShellApp.script.js ${DESTDIR}

echo "Creating $DESTDIR.tgz"
tar -zcf ${DESTDIR}.tgz ${DESTDIR}
