#!/usr/bin/env bash
set -e

BRANCH=develop
if [ "$1" != "" ] ; then
  BRANCH=$1
fi

DIR=self

if [ "$2" != "" ] ; then
  DIR=$2
fi

npm i -g @microsoft/api-extractor@^7.12.0

if [ "$DIR" != "self" ] ; then
  CLONE_DIR="$DIR-branch-clone"
  rm -rf $CLONE_DIR
  git clone --single-branch --branch $BRANCH https://github.com/SAP/spartacus.git $CLONE_DIR --depth 1
  cd $CLONE_DIR
fi


# Install dependencies and build lib
yarn
# yarn build:libs

# # Directory for reports
# rm -rf etc
# mkdir etc
