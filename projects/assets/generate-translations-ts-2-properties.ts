import * as fs from 'fs-extra';
import { translations } from './src/translations/translations';

function writeProperties(dir, fileName, properties) {
  const writeStream = fs.createWriteStream(dir + '/' + fileName, {
    autoClose: false,
  });
  properties.forEach((property) => writeStream.write(property + '\n'));
  writeStream.end();
}

function jsonToProperties(jsonObj, prefix?) {
  let result = [];
  Object.keys(jsonObj).forEach((key) => {
    let _prefix;
    if (jsonObj[key] && typeof jsonObj[key] === 'object') {
      const _currPrefix = key + '.';
      _prefix = prefix ? prefix + _currPrefix : _currPrefix;
      result = [...result, ...jsonToProperties(jsonObj[key], _prefix)];
    } else {
      _prefix = prefix ? prefix + key : key;
      result.push(_prefix + '=' + jsonObj[key] || '');
    }
  });
  return result;
}

// generate properties files
Object.keys(translations).forEach((lang) => {
  Object.keys(translations[lang]).forEach((chunk) => {
    const obj = translations[lang][chunk];
    const json = JSON.stringify(obj, null, 2);
    const properties = jsonToProperties(JSON.parse(json));
    writeProperties(
      '../../lang/properties',
      chunk + '_' + lang + '.properties',
      properties
    );
  });
});
console.log(`localized properties files are generated`);
