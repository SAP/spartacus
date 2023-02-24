#!/bin/bash


# This script requires the env variables ENDPOINT_URL_PUBLIC_SPARTACUS and ENDPOINT_URL_PUBLIC_API
# to be set prior to it's execution.  Declare them here for local debugging.

# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && yarn install)

# run spartacus ccv2 e2es for b2c
yarn e2e:run:ci:ccv2-b2b
