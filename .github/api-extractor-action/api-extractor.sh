#!/usr/bin/env bash
set -e

PATH=$1

npm i -g @microsoft/api-extractor@^7.12.0
cd "$PATH"
api-extractor run --local --verbose
