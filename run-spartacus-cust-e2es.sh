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

# Update variables based on the provided parameter

export E2E_BASE_SITE="electronics-spa"
export E2ES_TO_RUN="$CYPRESS_ASM_FOLDER/*.e2e.cy.ts"

# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && npm install)

# run spartacus ccv2 e2es for b2c
npm run e2e:run:ci:jdk21:ccv2-product-configurator


