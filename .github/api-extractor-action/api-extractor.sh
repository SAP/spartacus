#!/usr/bin/env bash
set -e

npm i -g @microsoft/api-extractor@^7.12.0

PATH='.'
if [ "$1" != "" ] ; then
  PATH=$1
fi

(
  cd $PATH && \
  api-extractor run --local --verbose
)
