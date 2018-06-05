#!/bin/bash
set -e
set -u

if [ $# == 0 ]; then
    echo "Usage: `basename $0` [major | minor | patch | prerelease]"
    exit
fi

BUMP=$1
DEPLOY_DIR="dist/storefrontshellapp"

echo "Bumping app version to $BUMP"
NEW_VERSION=`npm version $BUMP --no-git-tag-version`
echo "New version: $NEW_VERSION"

echo "Bulding storefront (shell) app"
sh generate-shellapp.sh

echo "publishing version $BUMP"
(cd $DEPLOY_DIR && npm publish storefrontapp.tgz)

git commit -am"Bumping app version to $NEW_VERSION"
git tag storefrontapp-$NEW_VERSION

echo "Pushing from $PWD"
git push origin develop --tags
