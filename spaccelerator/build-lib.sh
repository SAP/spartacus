echo "Delete the ./dist folder"
rm -Rf dist
echo "Build the lib"
yarn packagr
echo "Package the lib"
cd dist
npm pack
cd ..
ls -l dist
