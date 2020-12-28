#!/usr/bin/env bash
set -e

PATH='.'
if [ "$1" != "" ] ; then
  PATH=$1
fi

(
  cd $PATH && \
  npx @microsoft/api-extractor@^7.12.0 run --local --verbose
)
