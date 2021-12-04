#!/usr/bin/env bash

# =========================================================
# Running instructions:
# 1. Make sure you're on `develop` branch.
# 2. Run `./checkout-git-check.sh`
# =========================================================


# =========================================================
# Display branch to be sure we're in the right place
# =========================================================
# git branch

# =========================================================
# Get the latest changes
# =========================================================
git pull


# =========================================================
# since_date: Update the date accordingly. How far back to check for changes
# =========================================================
since_date=2021-09-10

git log --since=${since_date} --name-only > git-log.txt


echo "
==============================================
Checkout lib file changes since ${since_date}
==============================================
"

# =================================================================
# paths_to_watch: List of files or folders to "monitor" for changes
# =================================================================
paths_to_watch=(
'feature-libs/checkout/assets'
'feature-libs/checkout/components'
'feature-libs/checkout/core'
'feature-libs/checkout/occ'
'feature-libs/checkout/root'
'feature-libs/checkout/styles'
)

for path in ${paths_to_watch[@]}; do
    # echo "grep [${path}] git-log.txt"
    grep "${path}" git-log.txt 
done

echo "
==============================================
Checkout lib file changes - end
==============================================
"