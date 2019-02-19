#!/usr/bin/env bash
set -e
set -o pipefail

SONAR=$1
./ci-scripts/build-for-deploy.sh
