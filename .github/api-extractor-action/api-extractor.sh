#!/usr/bin/env bash
set -e

LIB_PATH=$1

{
cd "$LIB_PATH"
api-extractor run --local --verbose
}
