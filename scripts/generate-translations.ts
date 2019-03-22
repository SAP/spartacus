import * as fs from 'fs';
import * as rimraf from 'rimraf';
import { translations } from '../projects/storefrontlib/src/translations/index';

const libDist = './dist/storefrontlib/';
const translationsDist = libDist + 'i18n-assets/';
function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}
const getLangDir = lang => `${translationsDist}${lang}/`;
const getFileName = (lang, namespace) =>
  `${getLangDir(lang)}${namespace}.${lang}.json`;

if (!fs.existsSync(libDist)) {
  console.log(
    `Cannot generate translations. Directory '${libDist}' does not exist.`
  );
} else {
  // clear translations dist
  rimraf.sync(translationsDist);
  createDir(translationsDist);

  // generate files
  Object.keys(translations).forEach(lang => {
    createDir(getLangDir(lang));
    Object.keys(translations[lang]).forEach(namespace => {
      const obj = translations[lang][namespace];
      const json = JSON.stringify(obj, null, 2);
      const fileName = getFileName(lang, namespace);
      fs.writeFileSync(fileName, json, 'utf8');
    });
  });
  console.log(`Translations generated in '${libDist}'`);
}
