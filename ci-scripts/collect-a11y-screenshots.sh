#!/usr/bin/env bash
set -e

SCREENSHOTS_DIR="projects/storefrontapp-e2e-cypress/cypress/screenshots"
ARTIFACTS_DIR="a11y-failure-artifacts"

echo "Collecting screenshots from failed a11y tests..."

if [ ! -d "$SCREENSHOTS_DIR" ]; then
    echo "No screenshots found."
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
    screenshot_count=$((screenshot_count + 1))
done < <(find "$SCREENSHOTS_DIR" -name "*.png" -print0)

echo "Collected $screenshot_count screenshot(s)"

# Create simple summary file
echo "$screenshot_count" > "$ARTIFACTS_DIR/count.txt"
echo "Created count file with: $screenshot_count"

# List what we created
echo "Artifacts directory contents:"
ls -la "$ARTIFACTS_DIR"

echo "Screenshot collection completed successfully."
