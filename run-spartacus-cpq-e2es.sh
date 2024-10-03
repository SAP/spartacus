#!/bin/bash

# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && npm install)

# run spartacus ccv2 e2es for cpq
npm run e2e:run:ci:ccv2-cpq


