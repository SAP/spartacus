#!/usr/bin/env bash

# Computes the balanced GitHub Actions matrix for sharding unit tests.
#
# IMPORTANT: when the workflow passes UNIT_TEST_GROUP_PROJECTS to unit-tests.sh,
# that script runs `nx run-many` (NOT `nx affected`). So the affected-vs-all
# decision that unit-tests.sh used to make itself now lives HERE: the AFFECTED
# input controls whether we enumerate `nx show projects --affected` or all
# projects. The caller must set it to mirror unit-tests.sh's own rules
# (epic/* branch => all => AFFECTED=false; other PRs => affected => true;
# push/dispatch => all => false). Get this wrong and PRs silently under- or
# over-test. See .github/workflows/ci-continuous-integration.yml.

set -euo pipefail

KARMA_SHARDS="${KARMA_SHARDS:-2}"
VITEST_SHARDS="${VITEST_SHARDS:-4}"
AFFECTED="${AFFECTED:-false}"

AFF_FLAG=""
if [[ "$AFFECTED" == "true" ]]; then
    AFF_FLAG="--affected"
fi

# Apps are never unit-tested by unit-tests.sh (EXCLUDE_APPLICATIONS); drop them
# early so they don't pad a bucket as no-ops.
EXCLUDED_APPS='["storefrontapp","ssr-tests"]'

# List projects (JSON array) that have $1 as a target, honouring --affected.
# Returns "[]" when none.
show_projects() {
    local target="$1"
    npx nx show projects $AFF_FLAG --with-target="$target" 2>/dev/null | jq -c '. // []'
}

# karma leg = (test ∪ test-jest) − apps
KARMA_TEST=$(show_projects test)
KARMA_JEST=$(show_projects test-jest)
KARMA_NAMES=$(jq -nc \
    --argjson a "$KARMA_TEST" --argjson b "$KARMA_JEST" --argjson apps "$EXCLUDED_APPS" \
    '($a + $b) | unique | map(select(. as $p | $apps | index($p) | not))')

# vitest leg = test-vitest
VITEST_NAMES=$(show_projects test-vitest | jq -c 'unique')

# Attach a weight (spec-file count) to each project name so the partition can
# balance by workload rather than count. Falls back to 1 when the root can't be
# resolved or has no specs, so every project still carries positive weight.
weigh() {
    local names_json="$1"
    local out="[]"
    local p root w entry
    while IFS= read -r p; do
        [[ -z "$p" ]] && continue
        root=$(npx nx show project "$p" --json 2>/dev/null | jq -r '.root // empty')
        if [[ -n "$root" && -d "$root" ]]; then
            w=$(find "$root" -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' ')
        else
            w=1
        fi
        [[ "$w" -eq 0 ]] && w=1
        entry=$(jq -nc --arg n "$p" --argjson w "$w" '{name:$n,weight:$w}')
        out=$(jq -nc --argjson acc "$out" --argjson e "$entry" '$acc + [$e]')
    done < <(echo "$names_json" | jq -r '.[]')
    echo "$out"
}

KARMA_WEIGHTED=$(weigh "$KARMA_NAMES")
VITEST_WEIGHTED=$(weigh "$VITEST_NAMES")

# Greedy LPT partition into $n buckets, emitting matrix `include` entries.
# Sorts projects heaviest-first and drops each into the currently-lightest
# bucket — deterministic and near-optimal for our skew (one giant + long tail).
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
}

KARMA_BUCKETS=$(buckets "$KARMA_WEIGHTED" "$KARMA_SHARDS" karma)
VITEST_BUCKETS=$(buckets "$VITEST_WEIGHTED" "$VITEST_SHARDS" vitest)

jq -nc --argjson k "$KARMA_BUCKETS" --argjson v "$VITEST_BUCKETS" '{include: ($k + $v)}'
