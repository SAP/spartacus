#!/bin/bash

# This is just for MCs. This file will be deleted in future updates, where we unify the scripts to take parameters and to run package scripts accordingly.
# Remove all reference to MCs e2es/scripts from the repo when sample data from MCs and our core sample data aligns.

# install cypress standlone dependencies
(cd projects/storefrontapp-e2e-cypress && npm install)

# run spartacus mcs e2es for b2c
npm run e2e:run:ci:mcs
