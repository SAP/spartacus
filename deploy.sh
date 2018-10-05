#!/usr/bin/env bash
set -e


function usage() {
  echo "Usage: `basename $0` -v [npm_version] --preid [prerelease_id] --dry-run"
}

dryrun=false

if [ $# == 0 ]; then
  usage
  exit
fi

while [[ $# -gt 0 ]]
do
  case $1 in
    -p | --project )
      shift
      PROJECT=$1
      ;;
    -v | --version )
      shift
      BUMP=$1
      ;;
    --preid )
      shift
      preid=$1
      ;;
    --dryrun )
      dryrun=true
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

echo "Version: $BUMP"
echo "Preid: $preid"
echo "dry-run: $dryrun"

PROJECT='storefront'
PROJECT_DIR="projects/storefrontlib"
DEPLOY_DIR="dist/storefrontlib"

NPM_COMMAND="npm version $BUMP"

echo "Bumping $PROJECT_DIR version to $BUMP"
if [[ "prerelease" == $BUMP ]]; then
  NPM_COMMAND="$NPM_COMMAND --preid=$preid"
fi

echo "Command $NPM_COMMAND"
PROJECT_DIR_NEW_VERSION=$(cd $PROJECT_DIR && $NPM_COMMAND)
echo "New version: $PROJECT_DIR_NEW_VERSION"

echo "Bumping $DEPLOY_DIR to $BUMP"
DEPLOY_DIR_NEW_VERSION=$(cd $DEPLOY_DIR && $NPM_COMMAND)

echo "New version: $DEPLOY_DIR_NEW_VERSION"

if [ ! $DEPLOY_DIR_NEW_VERSION == $PROJECT_DIR_NEW_VERSION ]; then
  echo "ERROR: Version mismatch between $DEPLOY_DIR and $PROJECT_DIR"
  echo "Versions: $DEPLOY_DIR_NEW_VERSION vs $PROJECT_DIR_NEW_VERSION"
  exit 1
fi

echo "publishing version $BUMP"
published=(cd $DEPLOY_DIR && npm publish .)

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

