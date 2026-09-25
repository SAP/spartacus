---
name: pr-body
description: "Use this skill when the user asks to generate, write, or draft a pull request (PR) body or description for the current branch. Triggers on requests like 'write a PR body', 'generate PR description', or 'create the PR description'."
---

# Generate a PR body

Produce a pull request description for the current branch.

## Steps

1. **Find the Jira ID.** Read the current branch name (`git rev-parse --abbrev-ref HEAD`) and
   extract the Jira ID — a substring shaped like `CXSPA-xxxxx` (a project key in capitals,
   a hyphen, then digits). If the branch has no such substring, leave the placeholder
   `<jira_id>` in the link and tell the user you couldn't find one.

2. **Gather the changes.** Diff the branch against its base branch (usually `develop`) to see
   what changed, e.g. `git diff --stat $(git merge-base develop HEAD) HEAD` and
   `git log $(git merge-base develop HEAD)..HEAD --oneline`.

3. **Write the body** in this exact structure:

   - First line, always:

     ```
     Closes: https://jira.tools.sap/browse/<jira_id>
     ```

     (replace `<jira_id>` with the extracted ID, e.g. `CXSPA-13999`)

   - A blank line, then a short summary of what the branch changes.

## Writing the summary

- Keep it simple and plain — describe what changed and why, from a user/reviewer point of view.
- Avoid technical jargon, file paths.
- Do not include any links or URLs in the summary. The only link allowed in the whole body is
  the `Closes:` line at the top.
- A few short bullet points or a couple of sentences is enough. Don't pad it.

## Output format

Output the whole PR body inside a single fenced code block so the user can copy and paste it
in one action. Nothing outside the code block except a brief note if the Jira ID was missing.

### Example

```
Closes: https://jira.tools.sap/browse/CXSPA-13999

Show the customer's title (e.g. Mr, Ms) on the saved address card so the
displayed name matches what they entered during checkout.
```
