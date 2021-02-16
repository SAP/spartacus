#!/usr/bin/env node

const exec = require('child_process').exec;
const process = exec(
  'upp application deploy -b a0000000000000000000000000000001 -s ./dist/storefrontapp -e stage'
);

let output = '';

process.stdout.on('data', (data) => {
  console.log(data.toString());
  output += data.toString();
  //INFO - Deployment done. You can access the application at https://ddr1pf6lomx90.cloudfront.net
});

process.on('close', (data) => {
  console.log('Process done. Output --> ');
  // console.log(output);
});

process.on('exit', (code) => {
  if (code !== 0) {
    console.log(`upp deploy exited with code ${code}`);
  }
});
