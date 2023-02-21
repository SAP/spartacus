#!/bin/bash


# This script requires the env variables ENDPOINT_URL_PUBLIC_SPARTACUS and ENDPOINT_URL_PUBLIC_API
# to be set prior to it's execution.  Declare them here for local debugging.
CYPRESS_ROOT_FOLDER="cypress/integration"
CYPRESS_B2C_FOLDER="$CYPRESS_ROOT_FOLDER/regression"

export E2ES_TO_RUN="$CYPRESS_B2C_FOLDER/homepage.e2e-spec.ts,
$CYPRESS_ROOT_FOLDER/b2b/smoke/checkout/b2b-account-checkout-flow.e2e-spec.ts
"
# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && yarn install)

# run spartacus ccv2 e2es for b2c
yarn e2e:run:ci:ccv2-b2b
