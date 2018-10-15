#!/usr/bin/env bash
set -e

function usage() {
  echo "Usage: `basename $0` -v [major | minor | patch | premajor | preminor | prepatch | prerelease] --preid [prerelease-id]"
}

if [ $# == 0 ]; then
  usage
  exit
fi

while [[ $# -gt 0 ]]
do
  case $1 in
    -v | --version )
      shift
      BUMP=$1
      ;;
    --preid )
      shift
      preid=$1
      ;;
    -h | --help )
      usage
      exit 0
      ;;
    * )
      usage
      exit 1
  esac
  shift
done

PROJECT='storefront'
PROJECT_DIR="projects/storefrontlib"
DEPLOY_DIR="dist/storefrontlib"

BUMP_COMMAND="npm version $BUMP"
PUBLISH_CMD="npm publish ."

if [[ $BUMP =~ pre* ]]; then
  PUBLISH_CMD="$PUBLISH_CMD --tag next"

  if [[ -z $preid ]]; then
    echo "WARNING: No preversion id specified. Adding $version number only"
  else
    BUMP_COMMAND="$BUMP_COMMAND --preid=$preid"
    echo "Bump command: $BUMP_COMMAND"
  fi
fi

echo "Bumping $PROJECT_DIR version to $BUMP"
PROJECT_DIR_NEW_VERSION=$(cd $PROJECT_DIR && $BUMP_COMMAND)
echo "New version: $PROJECT_DIR_NEW_VERSION"

echo "Bumping $DEPLOY_DIR to $BUMP"
DEPLOY_DIR_NEW_VERSION=$(cd $DEPLOY_DIR && $BUMP_COMMAND)

echo "New version: $DEPLOY_DIR_NEW_VERSION"

if [ ! $DEPLOY_DIR_NEW_VERSION == $PROJECT_DIR_NEW_VERSION ]; then
  echo "ERROR: Version mismatch between $DEPLOY_DIR and $PROJECT_DIR"
  echo "Versions: $DEPLOY_DIR_NEW_VERSION vs $PROJECT_DIR_NEW_VERSION"
  exit 1
fi

echo "publishing version $BUMP"
# published=(cd $DEPLOY_DIR && $PUBLISH_CMD)
published=''

if [[ -z "$published" ]]; then
  NEW_VERSION=${PROJECT_DIR_NEW_VERSION:1}

  RELEASE_BRANCH="release/spartacus-$NEW_VERSION"
  git checkout -b $RELEASE_BRANCH

  cd $PROJECT_DIR
  git add package.json
  git commit -m"Bumping $PROJECT version to $PROJECT_DIR_NEW_VERSION"
  echo "Tagging new version $PROJECT-$NEW_VERSION"
  git tag $PROJECT-$NEW_VERSION
  echo "Pushing from $PWD"
  git push -u origin $RELEASE_BRANCH --tags

  echo 'Deploy script finished successfully'
else
  echo 'Error publishing package to npm. Reverting package bump and aborting. Please rebuild your library'
  (cd $PROJECT_DIR && git checkout package.json)
  exit 1
fi

