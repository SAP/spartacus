#!/usr/bin/env bash
set -e
set -o pipefail

echo "Updating dependencies"
yarn
#echo "-----"
#./ci-scripts/validate.sh
#echo "-----"
#./ci-scripts/lint.sh
#echo "-----"
#./ci-scripts/unit-tests.sh
#echo "-----"
#./ci-scripts/unit-tests-sonar.sh
#echo "-----"
#./ci-scripts/e2e-tests.sh

