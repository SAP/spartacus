#!/bin/sh
# scripts/handle-translation-changes.sh

folder_path=$1
translations_file="$folder_path/translations.ts"

# Function to check if an export statement exists in a file
check_export_statements() {
  local folder=$1
  local file=$2
  local statement="from './$folder/index';"
  if ! grep -q "$statement" "$file"; then
    echo "$folder is not listed in $file"
    exit 1
  else
    echo "$folder is already listed in $file"
  fi
}

# Function to check import statements in index.ts files
check_import_statements() {
  local folder=$1
  local index_file="$folder_path/$folder/index.ts"
  [ -f "$index_file" ] || { echo "Index file not found: $index_file"; exit 1; }

  json_files=$(find "$folder_path/$folder" -maxdepth 1 -type f -name "*.json" -exec basename {} \;)
  for json_file in $json_files; do
    local statement="from './$json_file';"
    if ! grep -q "$statement" "$index_file"; then
      echo "$json_file not found in $index_file"
      exit 1
    else
      echo "$json_file is already listed in $index_file"
    fi
  done
}

# Ensure the translations file exists
[ -f "$translations_file" ] || { echo "Translations file not found: $translations_file"; exit 1; }

# Get the list of translation folders
translation_folders=$(find "$folder_path" -mindepth 1 -maxdepth 1 -type d -exec basename {} \;)

# Check if each folder and index file is listed in the translations file
for folder in $translation_folders; do
  check_export_statements "$folder" "$translations_file"
  check_import_statements "$folder"
done