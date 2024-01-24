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
    npm ci && npm run build:libs
}

# Clear root containing the old package so the next package can be published 
function clear_root {
    rm -rf !(sub-folder)
    cp -r sub-folder/.pipeline .
    cp sub-folder/.npmignore .
}
# Append root's .nmpignore into module's .nmpignore file so it contains all paths.
function append_npmignore {
    $(cd $1 && echo "\n$2" >> .npmignore);
}

# Package is built and set at the root level
function pack {
    PACKAGE=$1
    cd sub-folder

    local CONTENT="$(cat .npmignore)"

    if [[ -z "$PACKAGE" ]]; then
        echo "Package cannot be empty"
        exit 1
    elif [[ $PACKAGE == 'styles' ]]; then
        cp -r projects/storefrontstyles/* ../.
    elif [[ $PACKAGE == 'schematics' ]]; then
        cp -r projects/schematics/* ../.
    elif [[ $PACKAGE == 'storefront' ]]; then
        append_npmignore "dist/storefrontlib" "$CONTENT"
        cp -r dist/storefrontlib/* ../.
    else
        append_npmignore "dist/$PACKAGE/" "$CONTENT"
        cp -r dist/$PACKAGE/* ../.
    fi
}

if [[ $1 == 'configure' ]]; then
    configure_project
else 
    clear_root
    pack "$1"
fi 