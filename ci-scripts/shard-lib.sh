#!/usr/bin/env bash
#
# Shared unit-test sharding helpers, sourced by both CI pipelines:
#   - ci-scripts/compute-unit-shards.sh  (GitHub Actions matrix)
#   - split-unit-test-projects.sh        (Azure/piper, synced from sap-pipeline-files)
#
# Sourcing this file defines functions only; it has no side effects.

# List projects (JSON array) that have $1 as a target. $2 (optional) = "--affected".
# Fails loudly if nx errors; returns "[]" when nx succeeds but finds nothing.
# --json is passed explicitly: `nx show projects` output is environment-dependent
# (JSON array locally, newline plaintext on non-TTY CI runners).
shard_show_projects() {
    local target="$1" aff="${2:-}" raw rc arr
    raw=$(npx nx show projects $aff --with-target="$target" --json 2>&1)
    rc=$?
    if [[ $rc -ne 0 ]]; then
        echo "ERROR: 'nx show projects $aff --with-target=$target --json' failed (exit $rc):" >&2
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

# Attach a weight to each project. $1 = JSON array of names. Weight = total lines
# across the project's *.spec.ts files (a better runtime proxy than file count).
# Emits a JSON array of {name, weight}.
shard_weigh() {
    local names_json="$1"
    local out="[]"
    local project root raw weight entry
    while IFS= read -r project; do
        [[ -z "$project" ]] && continue
        raw=$(npx nx show project "$project" --json 2>/dev/null || true)
        root=$(printf '%s' "$raw" | jq -r '.root // empty' 2>/dev/null || true)
        if [[ -n "$root" && -d "$root" ]]; then
            # Count only "meaningful" spec lines: skip imports, comment-only and blank lines,
            # so the weight better reflects test volume than raw line count.
            weight=$(find "$root" -name '*.spec.ts' -exec cat {} + 2>/dev/null | grep -cvE '^\s*(import|//|$)' | tr -d ' ')
        else
            weight=1
        fi
        [[ -z "$weight" || "$weight" -eq 0 ]] && weight=1
        entry=$(jq -nc --arg n "$project" --argjson w "$weight" '{name:$n,weight:$w}')
        out=$(jq -nc --argjson acc "$out" --argjson e "$entry" '$acc + [$e]')
    done < <(printf '%s' "$names_json" | jq -r '.[]?')
    printf '%s' "$out"
    return 0
}

# Greedy longest-processing-time partition of a weighted list into N buckets.
# $1 = JSON array of {name,weight}, $2 = number of buckets.
# Emits a JSON array of buckets, each a JSON array of project names (sorted).
shard_partition() {
    local weighted="$1" n="$2"
    jq -nc --argjson list "$weighted" --argjson n "$n" '
        ($list | sort_by(-.weight)) as $sorted
        | reduce $sorted[] as $p ({buckets: [range(0;$n) | {items:[], load:0}]};
            (.buckets | to_entries | min_by(.value.load).key) as $idx
            | .buckets[$idx].items += [$p.name]
            | .buckets[$idx].load  += $p.weight
          )
        | .buckets | map(.items | sort)
    '
    return 0
}
