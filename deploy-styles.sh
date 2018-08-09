#!/usr/bin/env bash
set -e
set -u

if [ $# == 0 ]; then
    echo "Usage: `basename $0` [major | minor | patch | prerelease]"
    exit
fi

BUMP=$1
PROJECT="storefrontstyles"
PROJECT_DIR="projects/$PROJECT"

pushd $PROJECT_DIR
echo "Bumping $PROJECT version to $BUMP"

PROJECT_NEW_VERSION=`npm version $BUMP`
NEW_VERSION_NO=${PROJECT_NEW_VERSION:1}

echo "New version: $PROJECT_NEW_VERSION"

NEW_PACKAGE=$PROJECT-$NEW_VERSION_NO.tgz

echo "Packing $NEW_PACKAGE"
npm pack

echo "publishing $NEW_PACKAGE"
npm publish $NEW_PACKAGE

echo "Cleaning up"
rm $NEW_PACKAGE

popd
git commit -am"Bumping version to $PROJECT_NEW_VERSION"
git tag $PROJECT-$PROJECT_NEW_VERSION
git push origin develop --tags

echo "Deployment of styles successful"
