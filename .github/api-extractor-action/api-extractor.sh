#!/usr/bin/env bash
set -e

PATH='.'
if [ "$1" != "" ] ; then
  PATH=$1
fi

npm i -g @microsoft/api-extractor@^7.12.0
cd $PATH
api-extractor run --local --verbose

