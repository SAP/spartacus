#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"
echo "Running ALL E2E tests sequentially"

npm run e2e:run

echo "-----"
echo "All E2E tests completed!"
