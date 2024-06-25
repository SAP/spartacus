#!/bin/bash

# uncomment below for local testing
# export ENDPOINT_URL_PUBLIC_SPARTACUS=https://spartacusstore.cg79x9wuu9-eccommerc1-d3-public.model-t.myhybris.cloud
# export ENDPOINT_URL_PUBLIC_API=https://api.cg79x9wuu9-eccommerc1-d3-public.model-t.myhybris.cloud

CYPRESS_ROOT_FOLDER="cypress/e2e"
CYPRESS_OTP_FOLDER="$CYPRESS_ROOT_FOLDER/regression/user_access"
CYPRESS_MYACCOUNT_V2_FOLDER="$CYPRESS_ROOT_FOLDER/regression/my-account"
CYPRESS_ACCESSIBILITY_FOLDER="$CYPRESS_ROOT_FOLDER/accessibility"

export CX_MY_ACCOUNT_V2=true
export E2ES_TO_RUN="$CYPRESS_OTP_FOLDER/otp-login.e2e-flaky.cy.ts"

# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && npm install)

# run spartacus ccv2 e2es for b2c
npm run e2e:run:ci:ccv2


