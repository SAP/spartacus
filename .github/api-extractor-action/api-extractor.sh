#!/usr/bin/env bash
set -e

PATH='.'
if [ "$1" != "" ] ; then
  PATH=$1
fi

(
  cd $PATH && \
  yarn api-extractor run --local --verbose
)
