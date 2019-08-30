#!/usr/bin/env bash
# Script that updates compodocs
# Run from the release branch root
set -e

function cleanup {
    echo '-----'
    echo 'Cleaning up'
    rm -rf dist
    rm -rf documentation
}

function build_libs {
    echo '-----'
    echo 'Building Spartacus libraries'
    yarn build:core:lib
}

function build_app {
    echo "-----"
    echo "Building SPA app"
    ng build storefrontapp -c=ci --base-href "https://sap.github.io/cloud-commerce-spartacus-storefront/"
}

function generate_docs {
    echo "-----"
    echo "Generating docs"
    yarn generate:docs

    mv documentation dist/storefrontapp/docs
}

function push_gh_pages {
    git clone git@github.com:SAP/cloud-commerce-spartacus-storefront.git spa -b gh-pages
    cd spa
    rm -rf *
    cp -R ../dist/storefrontapp/* .
    git add *
    git commit -m'Releasing docs for new version'
    git push origin gh-pages
}

cleanup
build_libs
build_app
generate_docs
push_gh_pages

# TODO: push to github releases
