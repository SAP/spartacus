#!/bin/bash

# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && yarn install)

# run spartacus ccv2 e2es for cpq
yarn e2e:run:ci:ccv2-cpq


