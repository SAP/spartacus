#!/bin/sh
# scripts/handle-translation-changes.sh

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

# Function to process a translation folder
process_translation_folder() {
  local folder_path=$1
  local translations_file="$folder_path/translations.ts"
  
  if echo "$folder_path" | grep -q -e "/dist/" -e "/node_modules/"; then
    return
  fi

  # Ensure the translations file exists
  [ -f "$translations_file" ] || { echo "Translations file not found: $translations_file"; exit 1; }

  # Get the list of translation folders
  translation_folders=$(find "$folder_path" -mindepth 1 -maxdepth 1 -type d -exec basename {} \;)

  # Check if each folder and index file is listed in the translations file
  for folder in $translation_folders; do
    check_export_statements "$folder" "$translations_file"
    check_import_statements "$folder"
  done
}

# Check if folder_path is provided as an argument
if [ -z "$1" ]; then
  # Find all translation folders in the repository
  translation_paths=$(find . -type d \( -path '*/assets/translations' -o -path '*/assets/src/translations' \))

  for path in $translation_paths; do
    process_translation_folder "$path"
  done
else
  folder_path=$1
  process_translation_folder "$folder_path"
fi

echo "Translations all successfully validated"