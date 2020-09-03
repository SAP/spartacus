#!/usr/bin/env bash
set -e
set -o pipefail

./ci-scripts/validate-lint.sh
./ci-scripts/unit-tests.sh
