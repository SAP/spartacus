const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');
const fs = require('fs');

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);
  on('task', {
    readFile(filename) {
      if (fs.existsSync(filename)) {
        return fs.readFileSync(filename, 'utf8');
      }

      return null;
    },

    deleteFolder(folderName) {
      return new Promise((resolve, reject) => {
        fs.rm(
          folderName,
          { maxRetries: 3, recursive: true, force: true },
          (err) => {
            if (err) {
              console.error(err);
              return reject(err);
            }
            resolve(null);
          }
        );
      });
    },
  });

  /* Set exact timestamp to be shared in all spec files */
  config.env.TIMESTAMP = Date.now() - 1535535333333;

  return config;
};
