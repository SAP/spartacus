#!/usr/bin/env bash
set -e

(
  if [ "$1" != "" ] ; then
    cd $1 && \
  fi
  api-extractor run --local --verbose
)
