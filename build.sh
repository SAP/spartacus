#!/usr/bin/env bash
set -e
set -o pipefail

SONAR=$1

./ci-scripts/validate-lint.sh
./ci-scripts/unit-tests-sonar.sh $SONAR
./ci-scripts/e2e-tests.sh