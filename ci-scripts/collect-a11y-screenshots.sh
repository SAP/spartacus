#!/usr/bin/env bash
set -e

SCREENSHOTS_DIR="projects/storefrontapp-e2e-cypress/cypress/screenshots"
ARTIFACTS_DIR="a11y-screenshots-container-${GITHUB_MATRIX_CONTAINER:-unknown}"

echo "Collecting screenshots from failed a11y tests..."

if [ ! -d "$SCREENSHOTS_DIR" ]; then
    echo "No screenshots found."
    exit 0
fi

mkdir -p "$ARTIFACTS_DIR"

spec_dirs=()
while IFS= read -r -d '' screenshot; do
    rel_path=${screenshot#$SCREENSHOTS_DIR/}
    spec_name=$(dirname "$rel_path")
    
    artifact_dir="$ARTIFACTS_DIR/$spec_name"
    mkdir -p "$artifact_dir"
    
    cp "$screenshot" "$ARTIFACTS_DIR/$rel_path"
    
    echo "Collected: $rel_path"
    
    if [[ ! " ${spec_dirs[@]} " =~ " ${spec_name} " ]]; then
        spec_dirs+=("$spec_name")
    fi
done < <(find "$SCREENSHOTS_DIR" -name "*.png" -print0)

unique_specs=${#spec_dirs[@]}
total_screenshots=$(find "$ARTIFACTS_DIR" -name "*.png" | wc -l)

echo "Collected $total_screenshots screenshot(s) from $unique_specs unique spec(s)"

