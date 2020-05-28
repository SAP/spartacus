SCHEMATICS_VERSION=""

if [ "$1" ]; then
  SCHEMATICS_VERSION="@$1"
fi

cd ../../schematics
npm unpublish @spartacus/schematics --registry http://localhost:4873 --force
yarn build && npm publish --registry http://localhost:4873
cd ../dev-schematics
echo "@spartacus:registry=http://localhost:4873" > .npmrc
npm uninstall @spartacus/schematics
rm -rf node_modules && yarn
npm i @spartacus/schematics$SCHEMATICS_VERSION
