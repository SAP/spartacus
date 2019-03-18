#!/usr/bin/env bash
set -e

zip -r docs.zip documentation
tar -zcvf docs.tar.gz documentation
