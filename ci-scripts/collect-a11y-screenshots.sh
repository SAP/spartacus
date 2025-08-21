#!/usr/bin/env bash
set -e

# Paths for screenshot collection
SCREENSHOTS_DIR="projects/storefrontapp-e2e-cypress/cypress/screenshots"
ARTIFACTS_DIR="a11y-failure-artifacts"
OUTPUT_JSON="$ARTIFACTS_DIR/failure-summary.json"

echo "Collecting screenshots from failed a11y tests..."

if [ ! -d "$SCREENSHOTS_DIR" ]; then
    echo "No screenshots directory found. No failures detected."
    exit 0
fi

mkdir -p "$ARTIFACTS_DIR"

# Copy all screenshots to artifacts directory
screenshot_count=0
while IFS= read -r -d '' screenshot; do
    rel_path=${screenshot#$SCREENSHOTS_DIR/}
    
    artifact_dir="$ARTIFACTS_DIR/$(dirname "$rel_path")"
    mkdir -p "$artifact_dir"
    
    cp "$screenshot" "$ARTIFACTS_DIR/$rel_path"
    
    echo "Collected: $rel_path"
    ((screenshot_count++))
done < <(find "$SCREENSHOTS_DIR" -name "*.png" -print0)

echo "Collected $screenshot_count screenshot(s)"

# Generate failure summary JSON
cat > "$OUTPUT_JSON" << EOF
{
  "pr_number": "${GITHUB_PR_NUMBER:-unknown}",
  "commit_sha": "${GITHUB_SHA:-unknown}",
  "run_id": "${GITHUB_RUN_ID:-unknown}",
  "container": "${GITHUB_MATRIX_CONTAINER:-unknown}",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "failures": []
}
EOF

# Parse screenshots and build failure list
python3 - << 'PYTHON_SCRIPT'
import os
import json
import glob
from pathlib import Path

artifacts_dir = "a11y-failure-artifacts"
screenshots_pattern = os.path.join(artifacts_dir, "**", "*.png")
screenshots = glob.glob(screenshots_pattern, recursive=True)

failures = []
for screenshot in screenshots:
    rel_path = os.path.relpath(screenshot, artifacts_dir)
    
    # Extract test information from path
    path_parts = rel_path.split('/')
    if len(path_parts) >= 2:
        test_type = path_parts[0]  # b2c or b2b
        filename = path_parts[-1]
        
        # Extract test name from filename (remove .a11y-e2e.cy.ts and other suffixes)
        test_name = filename.replace('.png', '').split(' -- ')[0]
        
        failure = {
            "test_type": test_type,
            "test_name": test_name,
            "screenshot_path": rel_path,
            "filename": filename
        }
        failures.append(failure)

# Update the JSON file with actual data
with open(os.path.join(artifacts_dir, "failure-summary.json"), 'r') as f:
    summary = json.load(f)

summary["failures"] = failures
summary["total_failures"] = len(failures)

with open(os.path.join(artifacts_dir, "failure-summary.json"), 'w') as f:
    json.dump(summary, f, indent=2)

print(f"Generated failure summary with {len(failures)} screenshots")
PYTHON_SCRIPT

echo "Screenshot collection completed."
