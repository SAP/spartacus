import * as fs from 'fs-extra';
import { translations } from './src/translations/translations';

function propertiesToJson(properties) {
  const jsonObj = {};
  properties.forEach((property) => {
    if (property.length > 0) {
      const name = property.split('=')[0];
      const value = property.split('=')[1];
      const names = name.split('.');
      getJsonObj(names, value, jsonObj);
    }
  });

  return jsonObj;
}

function getJsonObj(names, value, jsonObj) {
  const name = names[0];
  if (names.length === 1) {
    jsonObj[name] = value;
  } else {
    jsonObj[name] = getJsonObj(names.slice(1), value, jsonObj[name] || {});
  }
  return jsonObj;
}

const jsons = new Map();
const files = fs.readdirSync('../../lang/properties');
if (files) {
  files.forEach((file) => {
    if (file.endsWith('.properties')) {
      const path = '../../lang/properties/' + file;
      const properties = fs.readFileSync(path, 'utf8').split('\n');
      const json = propertiesToJson(properties);
      const key = file.substring(0, file.indexOf('.'));
      jsons.set(key, json);
    }
  });
}

Object.keys(translations).forEach((lang) => {
  Object.keys(translations[lang]).forEach((chunk) => {
    const translated = jsons.get(chunk + '_' + lang);
    if (translated) {
      translations[lang][chunk] = translated;
    }
  });

  const assetsTransPath = './src/translations';
  const tsFiles = fs.readdirSync(assetsTransPath + '/' + lang);
  if (tsFiles) {
    tsFiles.forEach((file) => {
      if (file !== 'index.ts') {
        const path = assetsTransPath + '/' + lang + '/' + file;
        const content = fs.readFileSync(path, 'utf8');
        const firstLine = content.split('=')[0];
        const chunk = firstLine.trim().split(' ').pop();
        fs.writeFileSync(
          path,
          firstLine + '=' + JSON.stringify(translations[lang][chunk], null, 2),
          'utf8'
        );
      }
    });
  }
});

console.log(`properties files are converted to json files`);
