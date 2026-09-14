#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=ci-scripts/shard-lib.sh
source "$SCRIPT_DIR/shard-lib.sh"

KARMA_SHARDS="${KARMA_SHARDS:-2}"
JEST_SHARDS="${JEST_SHARDS:-4}"
VITEST_SHARDS="${VITEST_SHARDS:-4}"
AFFECTED="${AFFECTED:-false}"

AFF_FLAG=""
if [[ "$AFFECTED" == "true" ]]; then
    AFF_FLAG="--affected"
fi

EXCLUDED_APPS='["storefrontapp","ssr-tests"]'
JEST_ONLY='["storefrontstyles","schematics","setup"]'

KARMA_TEST=$(shard_show_projects test "$AFF_FLAG")
KARMA_NAMES=$(jq -nc \
    --argjson a "$KARMA_TEST" --argjson apps "$EXCLUDED_APPS" --argjson jestonly "$JEST_ONLY" \
    '$a | unique | map(select(. as $p | ($apps + $jestonly) | index($p) | not))')

JEST_NAMES=$(jq -nc \
    --argjson a "$(shard_show_projects test-jest "$AFF_FLAG")" --argjson apps "$EXCLUDED_APPS" \
    '$a | unique | map(select(. as $p | $apps | index($p) | not))')

VITEST_NAMES=$(shard_show_projects test-vitest "$AFF_FLAG")

# Turn weighted buckets (JSON array of name-arrays) into GH matrix include entries.
matrix_legs() {
    local names_json="$1" n="$2" runner="$3" weighted
    weighted=$(shard_weigh "$names_json")
    shard_partition "$weighted" "$n" | jq -c --arg runner "$runner" --argjson n "$n" '
        to_entries
        | map({
            "test-runner": $runner,
            "shard-name": ($runner + "-" + ((.key + 1) | tostring) + "/" + ($n | tostring)),
            "projects": (.value | join(","))
          })
        | map(select(.projects != ""))
    '
}

KARMA_BUCKETS=$(matrix_legs "$KARMA_NAMES" "$KARMA_SHARDS" karma)
JEST_BUCKETS=$(matrix_legs "$JEST_NAMES" "$JEST_SHARDS" jest)
VITEST_BUCKETS=$(matrix_legs "$VITEST_NAMES" "$VITEST_SHARDS" vitest)

MATRIX=$(jq -nc \
    --argjson k "$KARMA_BUCKETS" --argjson j "$JEST_BUCKETS" --argjson v "$VITEST_BUCKETS" \
    '{include: ($k + $j + $v)}')

if [[ "$AFFECTED" != "true" ]] && [[ "$(printf '%s' "$MATRIX" | jq '.include | length')" -eq 0 ]]; then
    echo "ERROR: run-all mode produced an empty shard matrix — nx project enumeration likely failed." >&2
    exit 1
fi

printf '%s\n' "$MATRIX"
