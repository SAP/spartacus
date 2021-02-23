#!/usr/bin/env bash

echo "-----"
echo "Undeploying issue ${GITHUB_HEAD_REF}"

ISSUE_NO=`echo "${GITHUB_HEAD_REF}" | cut -d'-' -f 2`
upp application undeploy -b spartacus-feature-spa${ISSUE_NO} -e stage

echo "-----"
echo "App Undeployed successfully"


