#!/bin/bash

# Get command-line arguments
TEST_ROOT="$1"       # Root directory of Cypress tests
NUM_SPLITS="$2"      # Number of splits
REQUESTED_GROUP="$3" # Requested group number

# Check if arguments are provided
if [ -z "$TEST_ROOT" ] || [ -z "$NUM_SPLITS" ] || [ -z "$REQUESTED_GROUP" ]; then
    echo "Usage: $0 <directory> <num_splits> <requested_group>"
    exit 1
fi

# List all test files in subdirectories
TEST_FILES=$(find "$TEST_ROOT" -type f -name "*.cy.ts" ! -name "**flaky**" ! -name "**my-account-v2**")

# Calculate the total number of tests
TOTAL_TESTS=$(echo "$TEST_FILES" | wc -l)

echo $TOTAL_TESTS

# Calculate the number of tests per split
TESTS_PER_SPLIT=$((TOTAL_TESTS / NUM_SPLITS))

# Split the test files into the specified number of groups
split_files() {
    local i=0
    local j=0
    local group=""
    for file in $TEST_FILES; do
        if [ $i -eq 0 ]; then
            group[$j]=""
        fi
        group[$j]+="$file"
        if [ $i -ne $(($TESTS_PER_SPLIT - 1)) ]; then
            group[$j]+=","
        fi
        i=$((i + 1))
        if [ $i -eq $TESTS_PER_SPLIT ]; then
            i=0
            j=$((j + 1))
        fi
    done
    if [ $REQUESTED_GROUP -le $NUM_SPLITS ]; then
        echo "${group[$((REQUESTED_GROUP-1))]}"
    else
        echo "Requested group exceeds the total number of splits."
    fi
}

split_files