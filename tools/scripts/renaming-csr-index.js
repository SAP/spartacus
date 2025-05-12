const path = require('path');
const fs = require('fs');

const directory = 'dist/storefrontapp/browser';
const oldFileName = 'index.csr.html';
const newFileName = 'index.html';

const oldFilePath = path.join(directory, oldFileName);
const newFilePath = path.join(directory, newFileName);

fs.access(oldFilePath, fs.constants.F_OK, (err) => {
  if (!err) {
    fs.rename(oldFilePath, newFilePath, (renameErr) => {
      if (renameErr) {
        console.error('Error renaming file:', renameErr);
      } else {
        console.log(`${oldFileName} renamed to ${newFileName}`);
      }
    });
  } else {
    console.log(`${oldFileName} not found, no action taken.`);
  }
});
process.exit(0);

