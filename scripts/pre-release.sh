#!/usr/bin/env bash
# Script that updates compodocs
# Run from the release branch root
set -e

function cleanup {
    echo '--> Cleaning up spartacus workspace'
    delete_file docs.tar.gz
    delete_file docs.zip
    delete_file spartacussampledataaddon.zip
    delete_file spartacussampledataaddon.tar

    delete_dir coverage
    delete_dir dist
    delete_dir documentation
    delete_dir node_modules
}

function delete_file {
  if [ -a "$1" ]; then
    rm "$1"
  fi
}

function delete_dir {
  if [ -d "$1" ]; then
    rm -rf "$1"
  fi
}

function build_libs {
    echo '--> Building Spartacus libraries'
    yarn build:core:lib
}

function generate_docs {
    echo "--> Generating compodocs"
    yarn generate:docs

    echo "--> Getting dependencies again"
    yarn
}

function zipSamplesAddOn {
    echo "--> Generating Spartacus samples addon zip"
    delete_dir spartacussampledataaddon
    git clone https://github.tools.sap/cx-commerce/spartacussampledataaddon.git
    cd spartacussampledataaddon
    git archive -o spartacussampledataaddon.tar HEAD
    mv spartacussampledataaddon.tar ../
    git archive -o spartacussampledataaddon.zip HEAD
    mv spartacussampledataaddon.zip ../
    cd ..
    delete_dir spartacussampledataaddon
}

cleanup
zipSamplesAddOn
generate_docs
build_libs

echo "--> Pre-release tasks DONE."
