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

rm importer.js

echo "Bumping $PROJECT version to $BUMP"

PROJECT_NEW_VERSION=`npm version $BUMP`

echo "New version: $PROJECT_NEW_VERSION"

NEW_PACKAGE=$PROJECT-$PROJECT_NEW_VERSION.tgz
echo "publishing $NEW_PACKAGE"
npm publish .

popd
git tag $PROJECT-$PROJECT_NEW_VERSION
git commit -am"Bumping version to $PROJECT_NEW_VERSION"
git push origin develop --tags

echo "Deployment of styles successful"
