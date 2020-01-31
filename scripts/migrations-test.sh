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

  cd ../projects/schematics
  yarn build 
  cd ../../dist
fi

doItFor "core"
doItFor "storefrontlib"
doItFor "cds"

cd ../projects/storefrontstyles
unpublish "styles" && publish "styles" 
cd ../../dist

cd ../projects/schematics
unpublish "schematics" && publish "schematics" 
cd ../../dist
