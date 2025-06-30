#!/usr/bin/env bash

# Test Distribution Configuration

# Distribution strategy: "simple" or "complexity"
TEST_DISTRIBUTION_STRATEGY="${TEST_DISTRIBUTION_STRATEGY:-complexity}"

# Complexity scoring weights
COMPLEXITY_WEIGHT_IT_BLOCKS=3
COMPLEXITY_WEIGHT_DESCRIBE_BLOCKS=2
COMPLEXITY_WEIGHT_FILE_SIZE_DIVISOR=10

# A11Y specific configuration
A11Y_B2C_PATH="projects/storefrontapp-e2e-cypress/cypress/e2e/a11y/b2c"
A11Y_B2B_PATH="projects/storefrontapp-e2e-cypress/cypress/e2e/a11y/b2b"
A11Y_TEST_PATTERN="*.a11y-e2e.cy.ts"

# Future: Could add timing-based configuration
# TIMING_DATABASE_PATH=".github/cache/test-timings.json"
# USE_HISTORICAL_TIMING=false
