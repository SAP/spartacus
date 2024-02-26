#!/bin/bash
# This script is invoked from https://github.tools.sap/cx-commerce/wonderful-testing-framework/blob/main/resources/wtf/config.yaml
# By default, the e2es for b2c product-configurator will be executed without parameters. 
# Supported options include "cpq", "b2c" and "b2c_flaky"

param=${1:-"b2c"} # Default to "b2c" if no parameter provided

# Update variables based on the provided parameter
case "$param" in
  "cpq")
    export E2E_BASE_SITE="powertools-spa"
    export ENDPOINT_URL_PUBLIC_SPARTACUS=$ENDPOINT_URL_PUBLIC_SPA_POWERTOOLS 
    export E2ES_TO_RUN="'cypress/e2e/**/cpq-configuration.ccv2-e2e.cy.ts'"
    ;;
  "b2c")
    export E2E_BASE_SITE="electronics-spa"
    export E2ES_TO_RUN="'cypress/e2e/**/product_configurator/*-configurator*e2e.cy.ts'"
    ;;
  "b2c_flaky")
    export E2E_BASE_SITE="electronics-spa"
    export E2ES_TO_RUN="'cypress/e2e/**/*-configurator*e2e*flaky.cy.ts'"
    ;;
  *)
    echo "Invalid parameter. Please provide a valid parameter."
    exit 1
    ;;
esac


# Install cypress standalone dependencies
(cd projects/storefrontapp-e2e-cypress && npm install)

# run spartacus ccv2 e2es for product-configurator
npm run e2e:run:ci:ccv2-product-configurator