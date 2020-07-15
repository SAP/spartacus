import * as fs from 'fs-extra';
import { translations } from './src/translations/translations';

const assetsDistDir = '../../dist/assets/';
const translationsDistDir = assetsDistDir + 'i18n-assets/';
function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}
const getLangDir = (lang) => `${translationsDistDir}${lang}/`;
const getFileName = (lang, chunk) => `${getLangDir(lang)}${chunk}.json`;

if (!fs.existsSync(assetsDistDir)) {
  console.log(
    `Cannot generate translations. Directory '${assetsDistDir}' does not exist.`
  );
} else {
  // clear translations dist
  fs.removeSync(translationsDistDir);
  createDir(translationsDistDir);

  // generate files
  Object.keys(translations).forEach((lang) => {
    createDir(getLangDir(lang));
    Object.keys(translations[lang]).forEach((chunk) => {
      const obj = translations[lang][chunk];
      const NUM_TWO = 2;
      const json = JSON.stringify(obj, null, NUM_TWO);
      const fileName = getFileName(lang, chunk);
      fs.writeFileSync(fileName, json, 'utf8');
    });
  });
  console.log(`Translations generated in '${assetsDistDir}'`);
}
