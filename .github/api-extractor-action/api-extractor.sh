#!/usr/bin/env bash
set -e

LIB_PATH=$1

cd "$LIB_PATH"
npx @microsoft/api-extractor@7.12.0 run --local --verbose
