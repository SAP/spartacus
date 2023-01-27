#!/bin/bash

# This is just for MCs. This file will be deleted in future updates, where we unify the scripts to take parameters and to run package scripts accordingly.
# Remove all reference to MCs e2es/scripts from the repo when sample data from MCs and our core sample data aligns.

export ENDPOINT_URL_PUBLIC_SPARTACUS="https://spartacusstore.cg79x9wuu9-ecdhcomme2-s1-public.model-t.myhybris.cloud"
export ENDPOINT_URL_PUBLIC_API="https://api.cg79x9wuu9-ecdhcomme2-s1-public.model-t.myhybris.cloud"

# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && yarn install)

# run spartacus mcs e2es for b2c
yarn e2e:run:ci:mcs
