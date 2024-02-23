#!/bin/bash
# Install cypress standalone dependencies
(cd projects/storefrontapp-e2e-cypress && npm install)

# run spartacus ccv2 e2es for product-configurator
npm run e2e:run:ci:ccv2-product-configurator