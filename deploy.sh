#!/bin/bash
set -e
set -u

if [ $# == 0 ]; then
  echo "Usage: `basename $0` [app | lib] [major | minor | patch | prerelease]"
  exit
fi

APP=$1
VERSION=$2
APP_DIR="projects/storefront$APP"
DEPLOY_DIR="dist/storefront$APP"

pushd .
cd $APP_DIR
echo "Bumping to version --$VERSION from $PWD"
NEW_VERSION=`npm version $VERSION`
echo "New version: $NEW_VERSION"
popd
echo "Copying $APP_DIR/package.json $DEPLOY_DIR"
cp $APP_DIR/package.json $DEPLOY_DIR
pushd .
cd $DEPLOY_DIR
echo "publishing version $VERSION from $PWD"
# npm publish .
popd
cd $APP_DIR
git commit -am"Bumping version to $NEW_VERSION"
git tag storefrontlib-$NEW_VERSION
echo "Pushing from $PWD"
git push origin develop --tags

