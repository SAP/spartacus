/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs-extra';
import { translations } from './src/translations/translations';

const assetsDistDir = '../../dist/assets/';
const translationsDistDir = assetsDistDir + 'i18n-assets/';
function createDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}
const getLangDir = (lang: string) => `${translationsDistDir}${lang}/`;
const getFileName = (lang: string, chunk: string) =>
  `${getLangDir(lang)}${chunk}.json`;

if (!fs.existsSync(assetsDistDir)) {
  /* eslint-disable-next-line no-console */
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
      const json = JSON.stringify(obj, null, 2);
      const fileName = getFileName(lang, chunk);
      fs.writeFileSync(fileName, json, 'utf8');
    });
  });
  /* eslint-disable-next-line no-console */
  console.log(`Translations generated in '${assetsDistDir}'`);
}
