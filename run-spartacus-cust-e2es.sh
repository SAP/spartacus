#!/bin/bash

# This script is invoked from https://github.tools.sap/cx-commerce/wonderful-testing-framework/blob/main/resources/wtf/config.yaml
# By default, the e2es for b2c will be executed without parameters.
# Supported options include "b2b", "b2c"

# uncomment below for local testing
# export ENDPOINT_URL_PUBLIC_SPARTACUS=https://spartacusstore.cg79x9wuu9-eccommerc1-d3-public.model-t.myhybris.cloud
# export ENDPOINT_URL_PUBLIC_SPARTACUS=https://b2bspastore.cg79x9wuu9-eccommerc1-d3-public.model-t.myhybris.cloud
# export ENDPOINT_URL_PUBLIC_API=https://api.cg79x9wuu9-eccommerc1-d3-public.model-t.myhybris.cloud

CYPRESS_ROOT_FOLDER="cypress/e2e"
CYPRESS_ASM_FOLDER="$CYPRESS_ROOT_FOLDER/regression/asm"
CYPRESS_B2B_ASM_FOLDER="$CYPRESS_ROOT_FOLDER/b2b/regression/asm"

param=${1:-"b2c"} # Default to "b2c" if no parameter provided

# Update variables based on the provided parameter
case "$param" in
  "b2b")
    export E2E_BASE_SITE="powertools-spa"
    export ENDPOINT_URL_PUBLIC_SPARTACUS=$ENDPOINT_URL_PUBLIC_SPA_POWERTOOLS
    export E2ES_TO_RUN="$CYPRESS_B2B_ASM_FOLDER/*e2e.cy.ts"
    ;;
  "b2c")
    export E2E_BASE_SITE="electronics-spa"
    export E2ES_TO_RUN="$CYPRESS_ASM_FOLDER/*.e2e.cy.ts"
    ;;
  *)
    echo "Invalid parameter. Please provide a valid parameter."
    exit 1
    ;;
esac

# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && npm install)

# run spartacus ccv2 e2es for b2c
npm run e2e:run:ci:ccv2-product-configurator


