#!/usr/bin/env bash
set -e
set -o pipefail

SONAR=$1

echo "-----"
echo "generating docs"
yarn doc:generate
mv documentation docs
