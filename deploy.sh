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

echo "Bumping $PROJECT_DIR version to $BUMP"
PROJECT_DIR_NEW_VERSION=$(cd $PROJECT_DIR && npm version $BUMP)
echo "New version: $PROJECT_DIR_NEW_VERSION"

echo "Bumping $DEPLOY_DIR to $BUMP"
DEPLOY_DIR_NEW_VERSION=$(cd $DEPLOY_DIR && npm version $BUMP)
echo "New version: $DEPLOY_DIR_NEW_VERSION"

if [ ! $DEPLOY_DIR_NEW_VERSION == $PROJECT_DIR_NEW_VERSION ]; then
    echo "ERROR: Version mismatch between $DEPLOY_DIR and $PROJECT_DIR"
    echo "Versions: $DEPLOY_DIR_NEW_VERSION vs $PROJECT_DIR_NEW_VERSION"
    exit 1
fi

echo "publishing version $BUMP"
(cd $DEPLOY_DIR && npm publish .)

cd $PROJECT_DIR
git commit -am"Bumping version to $NEW_VERSION"
git tag $PROJECT-$NEW_VERSION
echo "Pushing from $PWD"
git push origin develop --tags
