#!/usr/bin/env bash

# =========================================================
# Running instructions:
# 1. Make sure you're on `develop` branch.
# 2. Run `./checkout-git-check.sh`
# 3. Copy the output file list to a temp file
# 4. switch back to the working branch, and carry over the changes from the listed files
# =========================================================

# feature-libs/checkout/root/checkout-root.module.ts
# feature-libs/checkout/root/index.ts
# feature-libs/checkout/root/pages/index.ts
# feature-libs/checkout/root/pages/order-confirmation-order-entries-context.spec.ts
# feature-libs/checkout/root/pages/order-confirmation-order-entries-context.ts


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
since_date=2021-12-04

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