#!/usr/bin/env bash
# The reason for this script is because piper does not support publishing multiple artifacts
# In addition, it only publishes packages that are found on the root of the project
# This script will pack every package and set it to the root level so it can be published properly
set -e
shopt -s extglob dotglob

# Configure the project to move everything into a sub-folder to keep root clean for publishing
function configure_project {
    mkdir sub-folder
    mv !(sub-folder) sub-folder
    cd sub-folder
    yarn --frozen-lockfile
}

# Clear root containing the old package so the next package can be published 
function clear_root {
    rm -rf !(sub-folder)
    cp -r sub-folder/.pipeline .
    cp sub-folder/.npmignore .
}

# Package is built and set at the root level
function pack {
    # arr=("core"
    # "styles"
    # "assets"
    # "storefrontlib"
    # "smartedit"
    # "qualtrics"
    # "tracking"
    # "user"
    # "product"
    # "cart"
    # "order"
    # "storefinder"
    # "asm"
    # "checkout"
    # "setup"
    # "organization"
    # "product-configurator"
    # "cds"
    # "cdc"
    # "digital-payments"
    # "epd-visualization"
    # "schematics"
    # "s4om")
        arr=("core"
    "styles"
    "storefrontlib"
    "user"
    "cart"
    "organization"
    "product-configurator"
    "cds"
    "cdc"
    "digital-payments"
    "epd-visualization"
    "schematics"
    "s4om")
    for PACKAGE in "${arr[@]}"; do
        echo $PACKAGE
    done
    for PACKAGE in "${arr[@]}"; do
        if [[ -z "$PACKAGE" ]]; then
            echo "Package cannot be empty"
            exit 1
        elif [[ $PACKAGE == 'styles' ]]; then
            echo "hi"
        elif [[ $PACKAGE == 'schematics' ]]; then
            yarn build:schematics
        else
            yarn build:$PACKAGE
        fi
    done
}

if [[ $1 == 'configure' ]]; then
    configure_project
else 
    pack
fi 