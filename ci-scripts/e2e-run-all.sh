#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"
echo '-----'
echo "Building Spartacus libraries"

export NODE_OPTIONS=--dns-result-order=ipv4first

npm ci

(cd projects/storefrontapp-e2e-cypress && npm ci)

npm run build:libs 2>&1 | tee build.log

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
npm run build

is_bot_commit() {
    LAST_COMMIT_AUTHOR=$(git log -1 --pretty=format:'%ae')

    echo "Last commit author: ${LAST_COMMIT_AUTHOR}"

    if [[ "${LAST_COMMIT_AUTHOR}" == *"dependabot[bot]@users.noreply.github.com" ]] ||
        [[ "${LAST_COMMIT_AUTHOR}" == *"renovate[bot]@users.noreply.github.com" ]]; then
        return 0
    else
        return 1
    fi
}

echo "Running ALL E2E tests sequentially"

npm run e2e:run

echo "-----"
echo "All E2E tests completed!"
