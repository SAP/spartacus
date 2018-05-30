#!/bin/bash
set -e
set -u

if [ $# == 0 ]; then
    echo "Usage: `basename $0` [project_name] [major | minor | patch | prerelease]"
    exit
fi

PROJECT=$1
BUMP=$2
PROJECT_DIR="projects/$PROJECT"
DEPLOY_DIR="dist/$PROJECT"

echo "Bumping version to $BUMP"
NEW_VERSION=$(cd $PROJECT_DIR && npm version $BUMP)
echo "New version: $NEW_VERSION"

echo "Copying $PROJECT_DIR/package.json $DEPLOY_DIR"
cp $PROJECT_DIR/package.json $DEPLOY_DIR

echo "publishing version $BUMP"
(cd $DEPLOY_DIR && npm publish .)

cd $PROJECT_DIR
git commit -am"Bumping version to $NEW_VERSION"
git tag $PROJECT-$NEW_VERSION
echo "Pushing from $PWD"
git push origin develop --tags
