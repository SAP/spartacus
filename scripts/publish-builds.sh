#!/usr/bin/env bash

set -x -u -e -o pipefail

# Find the most recent tag that is reachable from the current commit.
# This is shallow clone of the repo, so we might need to fetch more commits to
# find the tag.
function get_latest_tag {
    local depth=`git log --oneline | wc -l`
    local latest_tag=`git describe --tags --abbrev=0 || echo NOT_FOUND`
    
    while [ "$latest_tag" == "NOT_FOUND" ]; do
        # Avoid infinite loop.
        if [ "$depth" -gt "1000" ]; then
            echo "Error: Unable to find the latest tag." 1>&2
            exit 1;
        fi
        
        # Increase the clone depth and look for a tag.
        depth=$((depth + 50))
        git fetch --depth=$depth
        latest_tag=`git describe --tags --abbrev=0 || echo NOT_FOUND`
    done
    
    echo $latestTag;
}

function publish_builds {
    REPO_OWNER="SAP"
    SHA=`git rev-parse HEAD`
    COMMIT_MSG=`git log --oneline -1`
    COMMITTER_USER_NAME=`git --no-pager show -s --format='%cN' HEAD`
    COMMITTER_USER_EMAIL=`git --no-pager show -s --format='%cE' HEAD`
    
    local short_sha=`git rev-parse --short HEAD`
    local latest_tag=`get_latest_tag`
    
    for dir in dist/*/
    do
        LIB="$(basename ${dir})"
        REPO_URL="https://github.com/${REPO_OWNER}/cloud-commerce-spartacus-storefront-${LIB}-builds.git"
        
        echo "Publishing contents of ${dir} to ${REPO_URL}"
        
    done
    
    echo "Finished publishing spartacus builds"
}

publish_builds
