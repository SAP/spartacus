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
#
# We pass --json explicitly: `nx show projects` output format is
# environment-dependent — it emits a JSON array in some contexts but
# newline-delimited plain text on a non-TTY CI runner. Relying on the default
# silently returned "[]" on CI (no line matched a JSON array), green-skipping
# every test. --json forces the array everywhere.
#
# Still hardened for banners/daemon noise on stdout (isolate the JSON line), and
# we fail loudly when nx itself errors (non-zero exit) — e.g. an unresolvable
# base/head ref for --affected. Swallowing that would return "[]" and skip all
# tests, worse than a red build. nx-set-shas provides resolvable NX_BASE/NX_HEAD.
show_projects() {
    local target="$1" raw rc arr
    raw=$(npx nx show projects $AFF_FLAG --with-target="$target" --json 2>&1)
    rc=$?
    if [[ $rc -ne 0 ]]; then
        echo "ERROR: 'nx show projects $AFF_FLAG --with-target=$target --json' failed (exit $rc):" >&2
        printf '%s\n' "$raw" >&2
        exit "$rc"
    fi
    # Isolate the JSON array line (nx prints it on one line); tolerate leading noise.
    arr=$(printf '%s\n' "$raw" | grep -m1 '^\[' || true)
    if printf '%s' "$arr" | jq -e 'type == "array"' >/dev/null 2>&1; then
        printf '%s' "$arr" | jq -c 'unique'
    else
        # --json succeeded but produced no array line: genuinely no matching
        # projects (e.g. nothing affected). Return an empty array.
        printf '[]'
    fi
    return 0
}

# karma leg = (test ∪ test-jest) − apps
KARMA_TEST=$(show_projects test)
KARMA_JEST=$(show_projects test-jest)
KARMA_NAMES=$(jq -nc \
    --argjson a "$KARMA_TEST" --argjson b "$KARMA_JEST" --argjson apps "$EXCLUDED_APPS" \
    '($a + $b) | unique | map(select(. as $p | $apps | index($p) | not))')

# vitest leg = test-vitest
VITEST_NAMES=$(show_projects test-vitest)

# Attach a weight to each project so the partition balances by workload rather
# than project count. Weight = total lines across the project's *.spec.ts files
# (a better runtime proxy than file count: a lib with a few large specs can
# outweigh one with many tiny specs). Falls back to 1 when the root can't be
# resolved or has no specs, so every project still carries positive weight.
# NOTE: line count is still an approximation of real test runtime. If shard
# balance matters more, replace this with measured per-project test durations.
weigh() {
    local names_json="$1"
    local out="[]"
    local p root raw w entry
    while IFS= read -r p; do
        [[ -z "$p" ]] && continue
        raw=$(npx nx show project "$p" --json 2>/dev/null || true)
        root=$(printf '%s' "$raw" | jq -r '.root // empty' 2>/dev/null || true)
        if [[ -n "$root" && -d "$root" ]]; then
            # Total lines across all spec files; 0 if none.
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
    return 0
}

KARMA_BUCKETS=$(buckets "$KARMA_WEIGHTED" "$KARMA_SHARDS" karma)
VITEST_BUCKETS=$(buckets "$VITEST_WEIGHTED" "$VITEST_SHARDS" vitest)

MATRIX=$(jq -nc --argjson k "$KARMA_BUCKETS" --argjson v "$VITEST_BUCKETS" '{include: ($k + $v)}')

# Safety net: in run-all mode (AFFECTED != true) there are always projects, so an
# empty matrix means nx enumeration failed (daemon crash, bad output) rather than
# "nothing to test". Fail loudly instead of silently green-skipping every test.
# In affected mode an empty matrix is legitimate (PR touched nothing testable).
if [[ "$AFFECTED" != "true" ]] && [[ "$(printf '%s' "$MATRIX" | jq '.include | length')" -eq 0 ]]; then
    echo "ERROR: run-all mode produced an empty shard matrix — nx project enumeration likely failed." >&2
    exit 1
fi

printf '%s\n' "$MATRIX"
