#!/usr/bin/env bash

set -euo pipefail

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

show_projects() {
    local target="$1" raw rc arr
    raw=$(npx nx show projects $AFF_FLAG --with-target="$target" --json 2>&1)
    rc=$?
    if [[ $rc -ne 0 ]]; then
        echo "ERROR: 'nx show projects $AFF_FLAG --with-target=$target --json' failed (exit $rc):" >&2
        printf '%s\n' "$raw" >&2
        exit "$rc"
    fi
    arr=$(printf '%s\n' "$raw" | grep -m1 '^\[' || true)
    if printf '%s' "$arr" | jq -e 'type == "array"' >/dev/null 2>&1; then
        printf '%s' "$arr" | jq -c 'unique'
    else
        printf '[]'
    fi
    return 0
}

KARMA_TEST=$(show_projects test)
KARMA_NAMES=$(jq -nc \
    --argjson a "$KARMA_TEST" --argjson apps "$EXCLUDED_APPS" --argjson jestonly "$JEST_ONLY" \
    '$a | unique | map(select(. as $p | ($apps + $jestonly) | index($p) | not))')

JEST_NAMES=$(jq -nc \
    --argjson a "$(show_projects test-jest)" --argjson apps "$EXCLUDED_APPS" \
    '$a | unique | map(select(. as $p | $apps | index($p) | not))')

VITEST_NAMES=$(show_projects test-vitest)

weigh() {
    local names_json="$1"
    local out="[]"
    local p root raw w entry
    while IFS= read -r p; do
        [[ -z "$p" ]] && continue
        raw=$(npx nx show project "$p" --json 2>/dev/null || true)
        root=$(printf '%s' "$raw" | jq -r '.root // empty' 2>/dev/null || true)
        if [[ -n "$root" && -d "$root" ]]; then
            w=$(find "$root" -name '*.spec.ts' -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')
        else
            w=1
        fi
        [[ -z "$w" || "$w" -eq 0 ]] && w=1
        entry=$(jq -nc --arg n "$p" --argjson w "$w" '{name:$n,weight:$w}')
        out=$(jq -nc --argjson acc "$out" --argjson e "$entry" '$acc + [$e]')
    done < <(printf '%s' "$names_json" | jq -r '.[]?')
    printf '%s' "$out"
    return 0
}

KARMA_WEIGHTED=$(weigh "$KARMA_NAMES")
JEST_WEIGHTED=$(weigh "$JEST_NAMES")
VITEST_WEIGHTED=$(weigh "$VITEST_NAMES")

buckets() {
    local weighted="$1" n="$2" runner="$3"
    jq -nc --argjson list "$weighted" --argjson n "$n" --arg runner "$runner" '
        ($list | sort_by(-.weight)) as $sorted
        | reduce $sorted[] as $p ({buckets: [range(0;$n) | {items:[], load:0}]};
            (.buckets | to_entries | min_by(.value.load).key) as $idx
            | .buckets[$idx].items += [$p.name]
            | .buckets[$idx].load  += $p.weight
          )
        | .buckets | to_entries
        | map({
            "test-runner": $runner,
            "shard-name": ($runner + "-" + ((.key + 1) | tostring) + "/" + ($n | tostring)),
            "projects": (.value.items | sort | join(","))
          })
        | map(select(.projects != ""))
    '
    return 0
}

KARMA_BUCKETS=$(buckets "$KARMA_WEIGHTED" "$KARMA_SHARDS" karma)
JEST_BUCKETS=$(buckets "$JEST_WEIGHTED" "$JEST_SHARDS" jest)
VITEST_BUCKETS=$(buckets "$VITEST_WEIGHTED" "$VITEST_SHARDS" vitest)

MATRIX=$(jq -nc \
    --argjson k "$KARMA_BUCKETS" --argjson j "$JEST_BUCKETS" --argjson v "$VITEST_BUCKETS" \
    '{include: ($k + $j + $v)}')

if [[ "$AFFECTED" != "true" ]] && [[ "$(printf '%s' "$MATRIX" | jq '.include | length')" -eq 0 ]]; then
    echo "ERROR: run-all mode produced an empty shard matrix — nx project enumeration likely failed." >&2
    exit 1
fi

printf '%s\n' "$MATRIX"
