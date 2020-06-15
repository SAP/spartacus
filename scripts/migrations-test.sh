###########################################################
# This script builds the relevant spartacus libraries 
# and publushes them to the local npm registry.
# The building part can be skipped by providing the
# `skip` argument when calling the script: 
# `./migrations-test.sh skip`
###########################################################

unpublish () {
  echo "unpublishing "$1""
  npm unpublish @spartacus/"$1" --registry http://localhost:4873 --force
}

publish () {
  echo "publishing "$1""
  npm publish --registry http://localhost:4873
}

doItFor () {
  cd "$1"

  if [[ "$1" == "storefrontlib" ]]; then
    unpublish "storefront"
  else
    unpublish "$1"
  fi
  
  publish "$1"
  cd ..
}

SKIP_BUILD="$1"

cd ..
if [[ -z "$SKIP_BUILD" ]]; then
  rm -rf dist
  yarn build:core:lib:cds
fi
cd dist

if [[ -z "$SKIP_BUILD" ]]; then
  cd ../projects/storefrontstyles
  ng build
  cd ../../dist
fi

cd ../projects/schematics
yarn && yarn build 
cd ../../dist

doItFor "assets"
doItFor "core"
doItFor "storefrontlib"
doItFor "cds"

cd ../projects/storefrontstyles
unpublish "styles" && publish "styles" 
cd ../../dist

cd ../projects/schematics
unpublish "schematics" && publish "schematics" 
cd ../../dist
