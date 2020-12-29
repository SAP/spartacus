#!/usr/bin/env bash
set -e

DIR=self

if [ "$2" != "" ] ; then
  DIR=$2
fi


if [ "$DIR" != "self" ] ; then
  cd $DIR
fi


# Install dependencies and build lib
yarn build:libs

# # Directory for reports
rm -rf etc
mkdir etc
