const fs = require('fs');
const util = require('util');
const _ = require('lodash');
const { Plugin } = require('release-it');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const noop = Promise.resolve();

const parseFileOption = (option) => {
  const file = option.file;
  const path = option.path || 'version';
  return { file, path };
};

class Bumper extends Plugin {
  async getLatestVersion() {
    const { in: _in } = this.options;
    if (!_in) return;
    const { file, path } = parseFileOption(_in);
    let version = null;
    if (file) {
      const data = await readFile(file);
      const parsed = JSON.parse(data);
      version = _.get(parsed, path);
    }
    return version;
  }

  bump(version) {
    const { out } = this.options;
    const { isDryRun } = this.config;
    if (!out) return;
    return Promise.all(
      out.map(async (out) => {
        const { file, path } = parseFileOption(out);

        this.log.exec(`Writing version to ${file}`, isDryRun);

        if (isDryRun) return noop;

        const data = await readFile(file, 'utf8').catch(() => '{}');
        const indent = '  ';
        const parsed = JSON.parse(data);
        if (typeof path === 'string') {
          _.set(parsed, path, version);
        } else {
          path.map((path) => {
            _.set(parsed, path, version);
          });
        }
        return writeFile(file, JSON.stringify(parsed, null, indent) + '\n');
      })
    );
  }
}

module.exports = Bumper;
