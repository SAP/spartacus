

if [ $# -eq 0 ]; then
  echo "ERROR: Spartacus schematics version not provided. Aborting."
  exit 1
fi

cd ../../schematics
npm unpublish @spartacus/schematics --registry http://localhost:4873 --force
yarn build && npm publish --registry http://localhost:4873
cd ../dev-schematics
echo "@spartacus:registry=http://localhost:4873" > .npmrc
npm uninstall @spartacus/schematics
rm -rf node_modules && yarn
npm i @spartacus/schematics@$1
