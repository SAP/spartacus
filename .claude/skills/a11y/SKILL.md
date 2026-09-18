<a11y-skill>

# Accessibility (a11y) Fix Skill

## Goal
Identify accessibility issues sourced from Jira, dispatch one `a11y-developer` agent
per issue to implement + push the fix, and **generate the PR body and open the pull
request for each pushed branch yourself**. The per-issue *code* work (reading the
ticket, implementing the fix behind a feature toggle, committing, and pushing) lives
entirely in the `a11y-developer` agent definition (`.claude/agents/a11y-developer.md`)
— do **not** restate that logic here or in the spawn prompt, and do **not** pre-guess a
fix for any ticket. **Generating the PR body and creating the PR on GitHub is this
skill's job**, not the agent's: the agent stops at a pushed branch, and you fetch that
branch, produce the body with the `pr-body` skill, and run `gh pr create`.

## Prerequisites
- The `sap-jira` MCP server must be connected and authenticated (run `/mcp` if its
  tools are unavailable). All Jira reads go through this server's tools.
- The `a11y-developer` agent must exist at `.claude/agents/a11y-developer.md`.
- **`gh` auth must be available to you (the orchestrator)** so you can create PRs.
  Every `gh pr create` call is prefixed exactly `GH_TOKEN="$GH_PAT" GH_HOST=github.com`
  — matching the `Bash(GH_TOKEN=* GH_HOST=* gh *)` allowlist entry — and `$GH_PAT` must
  be set in your environment. Never embed a token in a URL or set up a credential helper.
- **Git push auth must be primed before spawning any agent.** The repo's global
  `credential.helper` is `store --file /tmp/creds`, but `/tmp/creds` is ephemeral and is
  often missing. Before Step 2, populate it once so every worktree can push over the
  already-tokenless `origin` remote without embedding a token or improvising auth
  (the source of repeated permission prompts):

  ```bash
  printf 'https://x-access-token:%s@github.com\n' "$GH_PAT" > /tmp/creds && chmod 600 /tmp/creds
  ```

  Verify with a read-only call before dispatching: `git ls-remote --heads origin >/dev/null`.

## Autonomy (orchestrator)
- Run the entire flow autonomously. Default to **yes** for every decision and tool
  execution — including creating the PRs. Never interrupt merely to report progress or
  get sign-off on routine work — proceed, then report at the end.
- The **only** exception is a **critical** change requiring human judgment (e.g. a
  public-API break, a security-sensitive change, or destroying work you did not
  create). Stop only in those cases.
- The spawned agents carry their own copy of this autonomy contract in their definition
  — you do **not** need to paste it into the spawn prompt.

## Steps

### 1. Fetch accessibility issues from Jira
- **1.1** Search with the `sap-jira` MCP server using this JQL:

  ```jql
  project = CXSPA AND component = "cfe--accessibility" AND statusCategory = "To Do" AND sprint in openSprints() AND assignee is EMPTY AND issuetype != Epic ORDER BY priority DESC
  ```

  Note: this project has no status literally named `TO DO`; its open issues use the
  status `Open`, which belongs to the `To Do` status category. Filtering by
  `statusCategory = "To Do"` matches all not-yet-started statuses regardless of their
  exact name.

- **1.2** Print the results in a table including at least: issue key, summary, status,
  priority, and component(s).

### 2. Dispatch one agent per issue
- **2.1** Spawn one `a11y-developer` agent per Jira issue, in parallel (all spawn calls in a
  single message). The agent definition sets `isolation: worktree`, so each runs in its
  own isolated worktree/branch — this is what makes concurrent runs safe (pushes target
  distinct `a11y/<issue-key>` branches, so they never collide).

- **2.2** Keep the spawn prompt **minimal**: pass only the Jira issue key (and its
  summary for convenience). The agent already knows the full procedure. Do **not** copy
  the autonomy contract, the feature-toggle rules, the push commands, or any fix
  guidance into the prompt — that duplication is what this skill exists to avoid.

  Example spawn prompt (this is the whole thing):

  > Fix the Spartacus accessibility issue **CXSPA-1234** — "<summary>". Follow your
  > agent instructions exactly and report back as specified.

  <!-- DISABLED — Jira write op. The connected `sap-jira` MCP server is read-only
       (no transition tool). Re-enable once a write-capable Jira MCP is available.
  - **2.2.1** Transition the issue from "TO DO" to "IN PROGRESS".
  -->

### 3. Generate the body and open the PR for each pushed branch
For each agent that reports a **successful push**, generate the PR body and create the
pull request yourself. The agent hands you the branch name (`a11y/<issue-key>`) and a
proposed PR title; everything else you derive from the pushed branch.

- **3.1** Fetch the pushed branch so you can diff it locally (matches `Bash(git *)`):

  ```bash
  git fetch origin a11y/<issue-key>
  ```

- **3.2** Generate the PR body by invoking the `pr-body` skill (via the Skill tool).
  Its output is the **authoritative** PR body — do **not** hand-write it. Because you
  run from the main working directory (not the branch's worktree), apply `pr-body`'s
  steps to the **fetched remote branch** instead of the current `HEAD`: take the Jira ID
  from the branch name (`a11y/<issue-key>`), and diff `origin/a11y/<issue-key>` against
  its merge-base with `develop`
  (`git diff $(git merge-base develop origin/a11y/<issue-key>) origin/a11y/<issue-key>`).
  Write the resulting body to `/tmp/pr-body-<issue-key>.md` (`/tmp` is an allowed working
  directory) so you can pass it via `--body-file` without re-quoting.

- **3.3** Create the PR in a **single** step, using the body file you wrote (no
  placeholder-then-edit). Keep the env prefix in exactly this order — it matches
  `Bash(GH_TOKEN=* GH_HOST=* gh *)`. Write the command on **one line** (no `\`
  line-continuations): the trailing `*` in the permission rule does not span embedded
  newlines, so a multi-line command falls through to a permission prompt even though the
  rule is present. A single line lets the rule match and the PR is created without
  prompting:

  ```bash
  GH_TOKEN="$GH_PAT" GH_HOST=github.com gh pr create --title "fix: <summary> (<key>)" --body-file /tmp/pr-body-<issue-key>.md --base develop --head a11y/<issue-key>
  ```

  `--head a11y/<issue-key>` targets the agent's pushed branch, so you can create every
  PR from your own working directory without checking out each branch.

- **3.4** Capture the PR URL that `gh pr create` prints — this is the authoritative PR
  URL for the issue (the agent does not return one).

- **3.5** If fetching, body generation, or `gh pr create` is blocked or fails, record
  the reason and do **not** clean up that issue's worktree (see 4.2) — leave the pushed
  branch so the PR can be created manually.

### 4. Clean up after each PR is created
- **4.1** Cleanup is an **orchestrator** responsibility, done only **after** you have
  successfully created the PR (PR URL in hand). Remove that issue's worktree from the
  main repo working directory (`git worktree remove <path>` then `git worktree prune`).
  Because the branch's commits are on the remote after the push, removing the local
  working directory loses nothing — routine cleanup, not the destructive kind the
  autonomy rule guards against.

  The `isolation: worktree` setup also leaves behind a throwaway local branch named
  `worktree-agent-<agentId>` (the branch the worktree was checked out on — distinct from
  the pushed `a11y/<issue-key>` branch, which is safe on the remote). `git worktree
  remove` / `prune` do **not** delete it, so delete it explicitly as part of cleanup:

  ```bash
  git worktree remove <path> && git worktree prune && git branch -D worktree-agent-<agentId>
  ```

  After the final issue, sweep any stragglers so none are left at the end of the run:
  `git branch --list 'worktree-agent-*' | tr -d ' ' | xargs -r -n1 git branch -D`.
- **4.2** If an agent **failed** to push, or your body generation / PR creation failed
  (Step 3.5), **do not** remove its worktree **or its `worktree-agent-<agentId>`
  branch** — leave both in place so the work can be recovered and inspected.

  <!-- DISABLED — Jira write op. The connected `sap-jira` MCP server is read-only
       (no add-comment / transition tools). Re-enable once a write-capable Jira MCP is
       available.
  - **4.3** Comment on the Jira issue linking the PR URL.
  - **4.4** Transition the issue from "IN PROGRESS" to "CODE REVIEW".
  -->

### 5. Report token consumption & cost
- **5.1** After all issues are processed, aggregate the usage reported by every spawned
  agent (input, output, cache read/write where available, total tokens) plus the
  orchestrator's own usage.
- **5.2** Present it as a table with one row per Jira issue and a final **Total** row.
  Columns: issue key, PR URL, input tokens, output tokens, total tokens, estimated cost
  (USD).
- **5.3** Compute cost from the token counts using the per-token pricing of the model
  used, and state which model and pricing assumptions were used. If exact usage numbers
  are unavailable for a step, say so rather than guessing.

</a11y-skill>
