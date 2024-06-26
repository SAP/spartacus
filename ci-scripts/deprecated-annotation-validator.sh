#!/usr/bin/env bash

# Get the target branch of the pull request
BASE_BRANCH=${GITHUB_BASE_REF:-main}

git fetch origin $BASE_BRANCH

changed_files=$(git diff --name-only origin/$BASE_BRANCH...HEAD)

invalid_files=()

regex_since="@deprecated since 2211\.[0-9]+.*"
regex_removed="Will be removed in 2211\.[0-9]+.*"

check_deprecated() {
  local file=$1
  local content=$(cat "$file")

  if grep -q "@deprecated" <<< "$content"; then
    local deprecated_block=$(grep -oP "/\*\*[^*]*\*+([^/*][^*]*\*+)*/" <<< "$content" | grep "@deprecated")

    if [[ ! $deprecated_block =~ $regex_since ]] || [[ ! $deprecated_block =~ $regex_removed ]]; then
      invalid_files+=("$file")
    fi
  fi
}

for file in $changed_files; do
  if [[ $file == *.ts ]] && [[ $file != *storefrontapp-e2e-cypress* ]]; then
    check_deprecated "$file"
  fi
done

if [ ${#invalid_files[@]} -eq 0 ]; then
  echo "All deprecated annotations are valid."
else
  echo "Files with invalid deprecated annotations:"
  for file in "${invalid_files[@]}"; do
    echo "$file"
  done
  exit 1
fi