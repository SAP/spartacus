#!/usr/bin/env bash
set -e
set -o pipefail

function validateStylesLint {
    echo "----"
    echo "Running styleslint"
    yarn lint:styles
}

function validateTsConfigFile {
    echo "Validating ${TSCONFIGFILE_TO_VALIDATE} integrity"
    LOCAL_ENV_LIB_PATH_OCCURENCES=$(grep -c "projects/storefrontlib/public_api" ${TSCONFIGFILE_TO_VALIDATE} || true)
    if [ $LOCAL_ENV_LIB_PATH_OCCURENCES \> 0 ];
    then
        echo "ERROR: ${TSCONFIGFILE_TO_VALIDATE} file is invalid. Found [${LOCAL_ENV_LIB_PATH}].";
        echo "A proper ng-packager build in /dist should be used in this context."
        exit 1
    else
        echo "${TSCONFIGFILE_TO_VALIDATE} file is valid.";
    fi;
}

function validateNoHardCodedText {
    echo "Validating no hard-coded text (usint i18n-lint)"
    yarn i18n-lint
}

LOCAL_ENV_LIB_PATH="projects/storefrontlib/public_api"
TSCONFIGFILE_TO_VALIDATE="projects/storefrontapp/tsconfig.app.prod.json"
validateTsConfigFile

echo "Validating that no 'fdescribe' occurrences are present in tests..."
results=$(grep -rl --include "*.spec.ts" fdescribe projects || true)
if [[ -z "$results" ]]; then
    echo "Success: No 'fdescribe' occurrences detected in tests."
else
    echo "ERROR: Detected 'fdescribe' occurrence(s) in these files:"
    echo "$results"
    exit 1
fi

echo "Validating that the storefrontlib does not import itself."
results=$(grep -rl --include "*.ts" "from 'storefrontlib'" projects/storefrontlib || true)
if [[ -z "$results" ]]; then
    echo "Success: storefrontlib does not seem to import itself."
else
    echo "ERROR: Detected occurrence(s) where storefronlib imports itself in these files:"
    echo "$results"
    exit 1
fi

validateStylesLint

echo "Validating code linting"
node --max_old_space_size=3584 ./node_modules/@angular/cli/bin/ng lint

echo "-----"

echo "Validating code formatting (using prettier)"
yarn prettier 2>&1 |  tee prettier.log
results=$(tail -1 prettier.log | grep projects || true)
if [[ -z "$results" ]]; then
    echo "Success: Codebase has been prettified correctly"
    rm prettier.log
else
    echo "ERROR: Codebase not prettified. Aborting pipeline. Please format your code"
    rm prettier.log
    exit 1
fi

validateNoHardCodedText
