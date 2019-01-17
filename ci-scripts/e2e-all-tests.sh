#!/usr/bin/env bash
set -e
set -o pipefail

TOKEN=$TRAVIS_TOKEN

if [ ! -z $1 ]; then
    if [ $1 == '-h' ]; then
        echo "Usage: $0 [travis_token. default:$TRAVIS_TOKEN]"
        exit 1
    else
        TOKEN=$1
    fi
fi

echo "Triggering custom Spa build with token $TOKEN"

body='{
    "request": {
    "message": "Spartacus nightly build (all e2e tests)",
        "branch":"develop",
        "config": {
            "jobs": {
                "include": [{
                        "stage": "Validation",
                        "script": "./ci-scripts/validate.sh",
                    "name": "Validation" },
                    { "script": "./ci-scripts/lint.sh",
                    "name": "Lint" },
                    { "stage": "Unit tests",
                        "script": "./ci-scripts/unit-tests-sonar.sh",
                    "name": "Unit tests/Sonar scan" },
                    { "script": "./ci-scripts/e2e-tests.sh all",
                    "name": "End to end tests" }
                ]
            }
        }
    }
}'

curl -s -X POST \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-H "Travis-API-Version: 3" \
-H "Authorization: token $TOKEN" \
-d "$body" \
https://api.travis-ci.org/repo/SAP%2Fcloud-commerce-spartacus-storefront/requests
