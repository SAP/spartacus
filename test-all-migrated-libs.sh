#!/usr/bin/env bash
echo "Running VITEST unit tests for migrated libraries"
npx nx run-many --all --target=test-vitest
return 0