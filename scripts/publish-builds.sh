#!/usr/bin/env bash
set -u -e -o pipefail

REPO_OWNER='SAP'
PROJECT_NAME='spartacus'
SHA=`git rev-parse HEAD`
COMMIT_MSG=`git log --oneline -1`
COMMITTER_USER_NAME=`git --no-pager show -s --format='%cN' HEAD`
COMMITTER_USER_EMAIL=`git --no-pager show -s --format='%cE' HEAD`
SHORT_SHA=`git rev-parse --short HEAD`

get_version() {
  echo `head $1/package.json | awk '/version/ { gsub(/"/, "", $2); gsub(/,/, "", $2);print $2 }'`
}

pack_styles() {
  local styles_path=projects/storefrontstyles
  local styles_dist_path=dist/styles

  rm -rf ${styles_dist_path}
  pushd $styles_path > /dev/null
  npm pack
  STYLES_TGZ=`ls *.tgz`
  popd > /dev/null
  tar -zxvf ${styles_path}/$STYLES_TGZ
  mv package ${styles_dist_path}
}

publish_snapshot() {
  local LIB=$1
  local LIB_DIR=$2
  local REPO_URL="https://${GITHUB_TOKEN}@github.com/${REPO_OWNER}/${PROJECT_NAME}-${LIB}-builds.git"
  local PUBLISH_BRANCH='master'
  local VERSION=$(get_version ${LIB_DIR})
  local BUILD_ID="${LIB}-${VERSION}+${SHORT_SHA}"

  echo "Publishing ${LIB} to ${REPO_URL} with ID ${BUILD_ID}"

  BUILD_REPO="spartacus-${LIB}-builds"
  TMP_DIR="tmp/${LIB}"

  echo "Pushing build artifacts to ${REPO_OWNER}/${BUILD_REPO}"

  rm -rf $TMP_DIR
  mkdir -p $TMP_DIR

  (
  cd $TMP_DIR && \
    git init && \
    git remote add origin $REPO_URL && \
    git fetch origin ${PUBLISH_BRANCH} --depth=1 && \
    git checkout origin/${PUBLISH_BRANCH}
  git checkout -b "${PUBLISH_BRANCH}"
  )

  if [ -e $LIB_DIR/README.md ]; then
    rm $LIB_DIR/README.md
  fi

  cp $TMP_DIR/README.md $LIB_DIR/README.md

  (
  cd $TMP_DIR && \
    git rm -r -f .
  )

  cp -R $LIB_DIR/* $TMP_DIR/

  echo `date` > $TMP_DIR/BUILD_INFO
  echo $SHA >> $TMP_DIR/BUILD_INFO

  (
  cd $TMP_DIR && \
    git config user.name "${COMMITTER_USER_NAME}" && \
    git config user.email "${COMMITTER_USER_EMAIL}" && \
    git add --all && \
    git commit -m "${COMMIT_MSG}" --quiet && \
    git tag "${BUILD_ID}"
  git push origin "${PUBLISH_BRANCH}" --tags --force
  )
}

publish_snapshot "core" "dist/core"
pack_styles
publish_snapshot "styles" "dist/styles"
publish_snapshot "assets" "dist/assets"
publish_snapshot "storefront" "dist/storefrontlib"

echo "Finished publishing snapshot build artifacts"
