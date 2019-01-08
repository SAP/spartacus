#!/usr/bin/env bash
set -e
set -o pipefail

if [ ! -z $1 ]; then
    if [ $1 == '-h' ]; then
        echo "Usage: $0 [travis_token]"
        exit 1
    else
        TOKEN=$1
    fi
else
    echo "No Travis token specified. Aborting"
    exit 1
fi

echo "Triggering custom Spa build with token $TOKEN"

body='{
    "request": {
        "message": "Override the commit message: this is an api request",
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
