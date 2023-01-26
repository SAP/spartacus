#!/bin/bash

# uncomment below for local testing
# export ENDPOINT_URL_PUBLIC_SPARTACUS=https://spartacusstore.cg79x9wuu9-eccommerc1-p1-public.model-t.myhybris.cloud
# export ENDPOINT_URL_PUBLIC_API=https://api.cg79x9wuu9-eccommerc1-p1-public.model-t.myhybris.cloud

CYPRESS_ROOT_FOLDER="cypress/integration"
CYPRESS_B2C_FOLDER="$CYPRESS_ROOT_FOLDER/regression"
CYPRESS_B2B_FOLDER="$CYPRESS_ROOT_FOLDER/b2b/regression"
CYPRESS_ACCESSIBILITY_FOLDER="$CYPRESS_ROOT_FOLDER/accessibility"
CYPRESS_SSR_FOLDER="$CYPRESS_ROOT_FOLDER/ssr"
CYPRESS_VENDOR_FOLDER="$CYPRESS_ROOT_FOLDER/vendor"


export E2ES_TO_RUN="$CYPRESS_B2C_FOLDER/checkout/checkout-flow.core-e2e-spec.ts,
$CYPRESS_B2C_FOLDER/homepage/homepage.core-e2e-spec.ts
"

# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && yarn install)

# run spartacus ccv2 e2es for b2c
yarn e2e:run:ci:ccv2


