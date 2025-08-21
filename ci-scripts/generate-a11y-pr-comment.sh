#!/usr/bin/env bash
set -e

# Generate PR comment from failure data
ARTIFACTS_DIR="a11y-failure-artifacts"
SUMMARY_JSON="$ARTIFACTS_DIR/failure-summary.json"
COMMENT_FILE="pr-comment.md"

if [ ! -f "$SUMMARY_JSON" ]; then
    echo "No failure summary found. Skipping PR comment generation."
    exit 0
fi

# Generate PR comment using Python
python3 - << 'PYTHON_SCRIPT'
import json
import os
from datetime import datetime

def generate_pr_comment():
    try:
        with open("a11y-failure-artifacts/failure-summary.json", 'r') as f:
            summary = json.load(f)
    except FileNotFoundError:
        return None
    
    if not summary.get("failures"):
        return None
    
    pr_number = os.environ.get('GITHUB_PR_NUMBER', 'unknown')
    run_id = os.environ.get('GITHUB_RUN_ID', 'unknown')
    commit_sha = os.environ.get('GITHUB_SHA', 'unknown')[:7]
    container = os.environ.get('GITHUB_MATRIX_CONTAINER', 'unknown')
    
    total_failures = len(summary["failures"])
    
    comment = f"""## A11Y Test Failures - Container {container}

{total_failures} accessibility test(s) failed in this PR.

<details>
<summary>View failure details</summary>

| Test Type | Test Name | Screenshot |
|-----------|-----------|------------|
"""
    
    # Group failures by test type
    b2c_failures = [f for f in summary["failures"] if f["test_type"] == "b2c"]
    b2b_failures = [f for f in summary["failures"] if f["test_type"] == "b2b"]
    
    for failure in b2c_failures + b2b_failures:
        test_type = failure["test_type"].upper()
        test_name = failure["test_name"]
        screenshot_url = f"https://github.com/{os.environ.get('GITHUB_REPOSITORY', 'SAP/spartacus')}/actions/runs/{run_id}/artifacts"
        
        comment += f"| {test_type} | `{test_name}` | [View screenshot]({screenshot_url}) |\n"
    
    comment += f"""
</details>

**To get the screenshots:**
1. Click the "View screenshot" links above to go to the workflow run
2. Download the `a11y-failure-artifacts-container-{container}` artifact 
3. Extract and check the screenshots for each failed test

**Helpful links:**
- [A11Y guidelines](https://wiki.one.int.sap/wiki/display/spar/Spartacus+Accessibility+Feature+Compliance)

_Commit {commit_sha} • Container {container}_
"""
    
    return comment

comment = generate_pr_comment()
if comment:
    with open("pr-comment.md", 'w') as f:
        f.write(comment)
    print("PR comment generated successfully")
else:
    print("No failures found, skipping comment generation")
PYTHON_SCRIPT

if [ -f "$COMMENT_FILE" ]; then
    echo "PR comment file created: $COMMENT_FILE"
    cat "$COMMENT_FILE"
else
    echo "No PR comment needed - no failures detected"
fi
