<a11y-skill>

# Accessibility (a11y) Fix Skill

## Goal
Identify accessibility issues sourced from Jira and dispatch one `a11y-fix` agent per
issue to fix each end-to-end. This skill is **orchestration only** — the per-issue work
(reading the ticket, implementing the fix behind a feature toggle, committing, pushing,
opening the PR) lives entirely in the `a11y-fix` agent definition
(`.claude/agents/a11y-fix.md`). Do **not** restate that logic here or in the spawn
prompt; do **not** pre-guess a fix for any ticket.

## Prerequisites
- The `sap-jira` MCP server must be connected and authenticated (run `/mcp` if its
  tools are unavailable). All Jira reads go through this server's tools.
- The `a11y-fix` agent must exist at `.claude/agents/a11y-fix.md`.

## Autonomy (orchestrator)
- Run the entire flow autonomously. Default to **yes** for every decision and tool
  execution. Never interrupt merely to report progress or get sign-off on routine work
  — proceed, then report at the end.
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
- **2.1** Spawn one `a11y-fix` agent per Jira issue, in parallel (all spawn calls in a
  single message). The agent definition sets `isolation: worktree`, so each runs in its
  own isolated worktree/branch — this is what makes concurrent runs safe (pushes target
  distinct `a11y/<issue-key>` branches, so they never collide).

- **2.2** Keep the spawn prompt **minimal**: pass only the Jira issue key (and its
  summary for convenience). The agent already knows the full procedure. Do **not** copy
  the autonomy contract, the feature-toggle rules, the push/PR commands, or any fix
  guidance into the prompt — that duplication is what this skill exists to avoid.

  Example spawn prompt (this is the whole thing):

  > Fix the Spartacus accessibility issue **CXSPA-1234** — "<summary>". Follow your
  > agent instructions exactly and report back as specified.

  <!-- DISABLED — Jira write op. The connected `sap-jira` MCP server is read-only
       (no transition tool). Re-enable once a write-capable Jira MCP is available.
  - **2.2.1** Transition the issue from "TO DO" to "IN PROGRESS".
  -->

### 3. Clean up after each agent
- **3.1** Cleanup is an **orchestrator** responsibility, done only **after** an agent
  reports a successful push **and** PR creation (PR URL in hand). Remove that issue's
  worktree from the main repo working directory
  (`git worktree remove <path>` then `git worktree prune`). Because the branch's commits
  are on the remote after the push, removing the local working directory loses nothing —
  routine cleanup, not the destructive kind the autonomy rule guards against.
- **3.2** If an agent **failed** to push or create the PR, **do not** remove its
  worktree — leave it in place so the work can be recovered and inspected.

  <!-- DISABLED — Jira write op. The connected `sap-jira` MCP server is read-only
       (no add-comment / transition tools). Re-enable once a write-capable Jira MCP is
       available.
  - **3.3** Comment on the Jira issue linking the PR URL.
  - **3.4** Transition the issue from "IN PROGRESS" to "CODE REVIEW".
  -->

### 4. Report token consumption & cost
- **4.1** After all issues are processed, aggregate the usage reported by every spawned
  agent (input, output, cache read/write where available, total tokens) plus the
  orchestrator's own usage.
- **4.2** Present it as a table with one row per Jira issue and a final **Total** row.
  Columns: issue key, input tokens, output tokens, total tokens, estimated cost (USD).
- **4.3** Compute cost from the token counts using the per-token pricing of the model
  used, and state which model and pricing assumptions were used. If exact usage numbers
  are unavailable for a step, say so rather than guessing.

</a11y-skill>
