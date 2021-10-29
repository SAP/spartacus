#!/usr/bin/env node
/**
 * Script that traverses our libraries and assigns a version to each one (in package.json)
 **/

const fs = require('fs');

const libs = [
  'projects/assets',
  'projects/core',
  'projects/storefrontlib',
  'projects/storefrontstyles',
  'projects/schematics',
  'core-libs/setup',
  'feature-libs/asm',
  'feature-libs/cart',
  'feature-libs/checkout',
  'feature-libs/order',
  'feature-libs/organization',
  'feature-libs/product',
  'feature-libs/product-configurator',
  'feature-libs/qualtrics',
  'feature-libs/smartedit',
  'feature-libs/storefinder',
  'feature-libs/tracking',
  'feature-libs/user',
  'integration-libs/cds',
  'integration-libs/cdc',
  'integration-libs/digital-payments',
];

function assignVersion(lib) {
  const filename = `${lib}/package.json`;
  const fc = fs.readFileSync(filename);
  const json = JSON.parse(fc);
  json.version = version;
  fs.writeFile(filename, JSON.stringify(json), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

const version = process.argv[2];

console.log(`Assigning version ${version} to libs...`);

if (!version) {
  console.log('No version provided. Aborting.');
  process.exit(1);
}

libs.forEach((lib) => assignVersion(lib));
