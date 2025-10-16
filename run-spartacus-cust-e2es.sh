#!/bin/bash

# This script is invoked from https://github.tools.sap/cx-commerce/wonderful-testing-framework/blob/main/resources/wtf/config.yaml
# By default, the e2es for b2c will be executed without parameters.
# Supported options include "b2b", "b2c"

# uncomment below for local testing
# export ENDPOINT_URL_PUBLIC_SPARTACUS=https://spartacusstore.cg79x9wuu9-eccommerc1-d3-public.model-t.myhybris.cloud
# export ENDPOINT_URL_PUBLIC_SPARTACUS=https://b2bspastore.cg79x9wuu9-eccommerc1-d3-public.model-t.myhybris.cloud
# export ENDPOINT_URL_PUBLIC_API=https://api.cg79x9wuu9-eccommerc1-d3-public.model-t.myhybris.cloud

param=${1:-"b2c"} # Default to "b2c" if no parameter provided


# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && npm install)

# run spartacus ccv2 e2es for b2c
npm run e2e:run:jdk21:d3


