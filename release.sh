#!/usr/bin/env bash
set -e

function usage() {
  echo "Usage: `basename $0`"
  echo "  -l [library]"
  echo "  -v [major | minor | patch | premajor | preminor | prepatch | prerelease]"
  echo "  --preid [prerelease-id]"
}

if [[ $# == 0 ]]; then
  usage
  exit
fi

while [[ $# -gt 0 ]]
do
  case $1 in
    -l | --library)
      shift
      LIB=$1
      ;;
    -v | --version)
      shift
      BUMP=$1
      ;;
    --preid)
      shift
      preid=$1
      ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      usage
      exit 1
  esac
  shift
done

LIB_DIR="projects/$LIB"
DEPLOY_DIR="dist/$LIB"

if [[ ! -d $LIB_DIR ]]; then
  echo "Library $LIB does not exist. Aborting"
  exit 1
fi

BUMP_COMMAND="npm version $BUMP"
PUBLISH_CMD="npm publish ."

if [[ $BUMP =~ pre* ]]; then
  PUBLISH_CMD="$PUBLISH_CMD --tag next"

  if [[ -z $preid ]]; then
    echo "WARNING: No prerelease id was specified"
  else
    BUMP_COMMAND="$BUMP_COMMAND --preid=$preid"
    echo "Bump command: $BUMP_COMMAND"
  fi
fi

echo "Bumping $LIB_DIR version to $BUMP"
LIB_DIR_NEW_VERSION=$(cd $LIB_DIR && $BUMP_COMMAND)
echo "New version: $LIB_DIR_NEW_VERSION"

echo "Building library $LIB"
ng build $LIB

echo "publishing version $BUMP"
published=$(cd $DEPLOY_DIR && $PUBLISH_CMD)
echo "Published: $published"

if [[ ! -z "$published" ]]; then
  NEW_VERSION=${LIB_DIR_NEW_VERSION:1}

  if [[ $LIB == "storefrontlib" ]]; then
    LIB="storefront"
  fi

  BRANCH=`git status | head -1`
  RELEASE_BRANCH=${BRANCH:10}

  TAG="$LIB-$NEW_VERSION"

  cd $LIB_DIR
  git add package.json
  git commit -m 'Bumping $PROJECT version to $LIB_DIR_NEW_VERSION'
  echo "Tagging new version ${TAG}"
  git tag ${TAG}
  echo "Pushing from $PWD"
  git push -u origin $RELEASE_BRANCH --tags

  echo 'Deploy script finished successfully'
else
  echo 'Error publishing package to npm. Reverting package bump and aborting. Please rebuild your library'
  (cd $LIB_DIR && git checkout package.json)
  exit 1
fi

