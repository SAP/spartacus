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

COMMIT=$BRANCH
if [ "$3" != "" ] ; then
  COMMIT=$3
fi

npm i -g @microsoft/api-extractor@^7.12.0

if [ "$DIR" != "self" ] ; then
  rm -rf $DIR
  git clone --single-branch --branch $BRANCH https://github.com/SAP/spartacus.git $DIR --depth 1
  cd $DIR
  git checkout $COMMIT
fi


# Install dependencies and build lib
yarn
# yarn build:libs

# # Directory for reports
# rm -rf etc
# mkdir etc
