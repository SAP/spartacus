###########################################################
# This script cleans up the `dev-schematics` project from any changed files. 
# It's useful to run it as `yarn cleanup-before-commit` before commiting. 
###########################################################

cd ../
rm .npmrc
git reset -- yarn.lock package.json
yarn
