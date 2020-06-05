SCHEMATICS_VERSION=""

if [ "$1" ]; then
  SCHEMATICS_VERSION="@$1"
fi

cd ../../schematics
yarn
npm unpublish @spartacus/schematics --registry http://localhost:4873 --force
yarn build && npm publish --registry http://localhost:4873

cd ../dev-schematics
yarn
echo "@spartacus:registry=http://localhost:4873" > .npmrc
yarn remove @spartacus/schematics
rm -rf node_modules && yarn
yarn add @spartacus/schematics$SCHEMATICS_VERSION
npm unpublish @spartacus/dev-schematics --registry http://localhost:4873 --force
yarn build && npm publish --registry http://localhost:4873

# cleanup the files
rm .npmrc
git checkout HEAD -- yarn.lock package.json
yarn
