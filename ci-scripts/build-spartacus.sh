#!/usr/bin/env bash
set -e
set -o pipefail

echo '-----'
echo "Building Spartacus libraries"

yarn install

(cd projects/storefrontapp-e2e-cypress && yarn install)

yarn build:libs 2>&1 | tee build.log

results=$(grep "Warning: Can't resolve all parameters for" build.log || true)
if [[ -z "${results}" ]]; then
    echo "Success: Spartacus production build was successful."
    rm build.log
else
    echo "ERROR: Spartacus production build failed. Check the import statements. 'Warning: Can't resolve all parameters for ...' found in the build log."
    rm build.log
    exit 1
fi
echo '-----'
echo "Building Spartacus storefrontapp"
yarn build