#!/usr/bin/env bash

OUTLETS_PARENT_DIR='./../src/add-test-outlets/files';
RELATIVE_OUTLETS_SOURCE_DIR='./../../../../storefrontapp/src/test-outlets';

function delete_dir {
  if [[ -d "$1" ]]; then
    rm -rf "$1"
  fi
}

function copy_dir {
  if [[ -d "$1" ]]; then
    mkdir -p $2
    cp -rf $1/* ./$2
  fi
}

function add_template_ext_in_dir {
  if [[ -d "$1" ]]; then
    find . -type f -exec mv '{}' '{}'.template \;
  fi
}

if [[ ! -d $OUTLETS_PARENT_DIR ]]; then
  mkdir $OUTLETS_PARENT_DIR
fi

cd $OUTLETS_PARENT_DIR
delete_dir ./test-outlets
copy_dir $RELATIVE_OUTLETS_SOURCE_DIR test-outlets
add_template_ext_in_dir test-outlets
