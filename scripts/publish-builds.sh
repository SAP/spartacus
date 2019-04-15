#!/usr/bin/env bash
set -u -e -o pipefail

REPO_OWNER='SAP'
PROJECT_NAME='cloud-commerce-spartacus-storefront'
SHA=`git rev-parse HEAD`
COMMIT_MSG=`git log --oneline -1`
COMMITTER_USER_NAME=`git --no-pager show -s --format='%cN' HEAD`
COMMITTER_USER_EMAIL=`git --no-pager show -s --format='%cE' HEAD`
SHORT_SHA=`git rev-parse --short HEAD`

get_version() {
    echo `head package.json | awk '/version/ { gsub(/"/, "", $2); gsub(/,/, "", $2);print $2 }'`
}

publish_snapshot() {
    local LIB=$1
    local LIB_DIR=$2
    local REPO_URL="https://${GITHUB_TOKEN}@github.com/${REPO_OWNER}/${PROJECT_NAME}-${LIB}-builds.git"
    local BRANCH='master'
    local VERSION=$(get_version)
    local BUILD_ID="${LIB}-${VERSION}+${SHORT_SHA}"

    echo "Publishing ${LIB} to ${REPO_URL} with ID ${BUILD_ID}"

    BUILD_REPO="spartacus-${LIB}-builds"
    TMP_DIR="tmp/${LIB}"

    echo "Pushing build artifacts to ${REPO_OWNER}/${BUILD_REPO}"

    # create local repo folder and clone build repo into it
    rm -rf $TMP_DIR
    mkdir -p $TMP_DIR

    (
    cd $TMP_DIR && \
        git init && \
        git remote add origin $REPO_URL && \
        git fetch origin ${BRANCH} --depth=1 && \
        git checkout origin/${BRANCH}
    git checkout -b "${BRANCH}"
    )

    # copy over build artifacts into the repo directory
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
        git push origin "${BRANCH}" --tags --force
    )
}

publish_snapshot "core" "dist/core"
publish_snapshot "storefront" "dist/storefrontlib"

echo "Finished publishing build artifacts"
