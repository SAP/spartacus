<a11y-skill>

# Accessibility (a11y) Fix Skill

## Goal
Identify and fix accessibility issues sourced from Jira.

## Prerequisites
- The `sap-jira` MCP server must be connected and authenticated (run `/mcp` if its
  tools are unavailable). All Jira reads, transitions, and comments below go through
  this server's tools.
- Permissions for this skill are configured in `.claude/settings.local.json` (never
  `.claude/settings.json`). That file grants full permission to edit existing files
  and add new files (`Edit` and `Write`) so the fix flow runs without approval
  prompts.

## Steps
- Unless it is a critical change that needs addressing by a developer, do not interrupt the flow for approvals of executions.

### 1. Fetch accessibility issues from Jira
- **1.1** Use the `sap-jira` MCP server to search for a11y issues with this JQL:

  ```jql
  project = CXSPA AND component = "cfe--accessibility" AND statusCategory = "To Do" AND sprint in openSprints() AND assignee is EMPTY AND issuetype != Epic ORDER BY priority DESC
  ```

  Note: this project has no status literally named `TO DO`; its open issues use the
  status `Open`, which belongs to the `To Do` status category. Filtering by
  `statusCategory = "To Do"` matches all not-yet-started statuses regardless of their
  exact name.

- **1.2** Print the results in a comprehensive (non-exhaustive) table including at least:
  issue key, summary, status, priority, and component(s).

### 2. Execution
- **2.1** Spawn one agent per Jira issue (at most one agent at a time).
<!-- DISABLED — Jira write op. The connected `sap-jira` MCP server is read-only
     (no transition tool). Re-enable this step once a write-capable Jira MCP (or a
     REST token) is available.
- **2.1.1** Transition the Jira issue from **"TO DO"** to **"IN PROGRESS"** using the `sap-jira` MCP server.
-->

- **2.2** First capture the current branch — the branch the skill was executed on
  (e.g. `git rev-parse --abbrev-ref HEAD`) — so it can be restored in step 3.5. Then
  create a branch from `develop` named `a11y/[issue-key]` (e.g. `a11y/CXSPA-1234`).
- **2.3** Determine whether a feature toggle or feature directive is necessary with the following rule:
  - Any change to the template affected is protected behind a feature toggle.
  - The feature toggle's default value is set to `false` in the file: `core-libs/core/src/features-config/feature-toggles/config/feature-toggles.ts`
  - The feature toggle's providers override the value to set it to `true` in our implementation of the storefront's file: `projects/storefrontapp/src/app/spartacus/spartacus-features.module.ts`
  - Use this example as a baseline where the label was changed for div:

```html
<div
  class="cx-my-coupons-form-group form-group cx-mycoupon-thead-mobile col-sm-12 col-md-4 col-lg-4"
  *cxFeature="'showSortFieldsOnlyAtTop'"
></div>
<label
  class="cx-my-coupons-form-group form-group cx-mycoupon-thead-mobile col-sm-12 col-md-4 col-lg-4"
  *cxFeature="'!showSortFieldsOnlyAtTop'"
>
```

- **2.4** Fix the issue using the Jira issue summary & description (fetch the full issue
  details from the `sap-jira` MCP server when needed).
- **2.5** Commit the code fix with the prefix: `fix:` and a short message that summarizes
  what was fixed. Reference the issue key in the message (e.g. `fix: <summary> (CXSPA-1234)`).

### 3. Publish results
- **3.1** Push the branch to remote.
- **3.2** Create a PR with the GitHub CLI (`gh`) and output a short summary of what was
  fixed in the PR description. Reference the Jira issue key in the PR title/description.
<!-- DISABLED — Jira write op. The connected `sap-jira` MCP server is read-only
     (no add-comment tool). Re-enable this step once a write-capable Jira MCP (or a
     REST token) is available.
- **3.3** Add a comment to the Jira issue via the `sap-jira` MCP server linking the PR URL.
- **3.4** Transition the Jira issue from **"IN PROGRESS"** to **"CODE REVIEW"** using the
  `sap-jira` MCP server.
-->
- **3.5** Checkout back to the branch the skill was executed on (the one captured in
  step 2.2), **not** `develop`.

### 4. Report token consumption & cost
- **4.1** After all issues have been processed, share a summary of the token
  consumption and estimated cost for the **full skill execution**. Aggregate the usage
  reported by every agent spawned in step 2.1 (input tokens, output tokens, cache
  read/write tokens where available, and total tokens), plus the orchestrator's own
  usage.
- **4.2** Present it as a table with one row per Jira issue and a final **Total** row.
  Suggested columns: issue key, input tokens, output tokens, total tokens, estimated
  cost (USD).
- **4.3** Compute the estimated cost from the token counts using the per-token pricing
  of the model used for the run, and state which model and pricing assumptions were
  used. If exact usage numbers are unavailable for a step, say so rather than guessing.

</a11y-skill>
