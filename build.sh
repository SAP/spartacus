#!/usr/bin/env bash
set -e
set -o pipefail

SONAR=$1

./ci-scripts/unit-tests-sonar.sh $SONAR
./ci-scripts/build-for-deploy.sh
