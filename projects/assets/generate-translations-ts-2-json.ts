/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs-extra';
import { en } from './src/translations/en';

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
  const lang = 'en';
  const translationsEn: Record<string, any> = en;
  createDir(getLangDir(lang));
  Object.keys(translationsEn).forEach((chunk) => {
    const obj = translationsEn[chunk];
    const json = JSON.stringify(obj, null, 2);
    const fileName = getFileName(lang, chunk);
    fs.writeFileSync(fileName, json, 'utf8');
  });
  /* eslint-disable-next-line no-console */
  console.log(`Translations generated in '${assetsDistDir}'`);
}
