#!/usr/bin/env bash

TIMING_DATABASE_PATH=".github/cache/test-timings.json"
USE_HISTORICAL_TIMING=true
TIMING_DATA_THRESHOLD=70

A11Y_B2C_PATH="projects/storefrontapp-e2e-cypress/cypress/e2e/a11y/b2c"
A11Y_B2B_PATH="projects/storefrontapp-e2e-cypress/cypress/e2e/a11y/b2b"
A11Y_TEST_PATTERN="*.a11y-e2e.cy.ts"