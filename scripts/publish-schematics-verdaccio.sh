###########################################################
# This script builds the relevant spartacus libraries
# and publishes them to the local npm registry.
#
# The building part can be skipped by providing the
# `skip` argument when calling the script:
# `./publish-schematics-verdaccio.sh skip`
#
# Building and publishing dev-schematics require `dev` param:
# `./publish-schematics-verdaccio.sh dev`
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
  yarn build:libs
fi
cd dist

if [[ -z "$SKIP_BUILD" ]]; then
  cd ../projects/storefrontstyles
  ng build
  cd ../../dist
fi

cd ../projects/schematics
yarn && yarn build
cd ../../
cd feature-libs/organization
yarn build:schematics
cd ../../dist

doItFor "assets"
doItFor "core"
doItFor "storefrontlib"
doItFor "cds"
doItFor "organization"
doItFor "setup"

cd ../projects/storefrontstyles
unpublish "styles" && publish "styles"
cd ../../dist

cd ../projects/schematics
unpublish "schematics" && publish "schematics"
cd ../../dist

if [[ "$1" == "dev" ]] || [[ "$2" == "dev" ]]; then
  cd ../projects/dev-schematics
  unpublish "dev-schematics"
  yarn && yarn build
  publish "dev-schematics"
  cd ../../dist
fi
