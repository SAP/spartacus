#!/usr/bin/env bash
set -e
set -u

function usage() {
  echo "Usage: `basename $0` -p [project_name] -v [npm_version] --preid [prerelease_id] --dry-run"
}

function parse_options() {
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
      --dry-run )
        dryrun=true
        ;;
      -h | --help )
        usage
        exit
        ;;
      * )
        usage
        exit 1
    esac
    shift
  done

  echo "Project: $PROJECT"
  echo "Version: $BUMP"
  echo "Preid: $preid"
  echo "dry-run: $dryrun"

}

parse_options
exit

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
published=(cd $DEPLOY_DIR && npm publish .)

if [[ =z "$results" ]]; then

  RELEASE_BRANCH="release/$PROJECT_DIR_NEW_VERSION"
  git checkout -b $RELEASE_BRANCH

  cd $PROJECT_DIR
  git add package.json
  git commit -m"Bumping $PROJECT version to $PROJECT_DIR_NEW_VERSION"
  git tag $PROJECT-$PROJECT_DIR_NEW_VERSION
  echo "Pushing from $PWD"
  git push -u origin $RELEASE_BRANCH --tags

  echo 'Deploy script finished successfully'
else
  echo 'Error publishing package to npm. Reverting package bump and aborting. Please rebuild your library'
  (cd $PROJECT_DIR && git checkout package.json)
  exit 1
fi

