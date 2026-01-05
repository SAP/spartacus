/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs-extra';

const MAX_FILE_SIZE = 50 * 1024; // 50 KB limit
const BANNED_KEYS = [
  '<script',
  'onerror',
  'onload',
  'onclick',
  'javascript:',
  '__proto__',
  'constructor',
  'eval',
];
const NOT_ALLOWED_VALUE_REGEX =
  /^[{\[](?:[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|"(?:[^"\\]|\\.)*")*[}\]]$/u;

export function validateJson(filePath: string) {
  const fileSize = fs.statSync(filePath).size;

  if (fileSize > MAX_FILE_SIZE) {
    throw new Error(`File ${filePath} exceeds size limit (${fileSize} bytes).`);
  }

  const content = fs.readFileSync(filePath, 'utf8');

  let parsedJson;
  try {
    parsedJson = JSON.parse(content);
  } catch (error) {
    throw new Error(`Invalid JSON format in ${filePath}`);
  }

  const traverse = (jsonData: any) => {
    for (const key in jsonData) {
      if (typeof jsonData[key] === 'object' && jsonData[key] !== null) {
        traverse(jsonData[key]);
      } else {
        const translation = jsonData[key];

        if (typeof translation !== 'string') {
          throw new Error(`Translation entry is not a string.`);
        }

        if (
          NOT_ALLOWED_VALUE_REGEX.test(translation) ||
          NOT_ALLOWED_VALUE_REGEX.test(key)
        ) {
          throw new Error(
            `Unallowed char in ${filePath}: ${key} '${translation}'.`
          );
        }

        if (
          BANNED_KEYS.some(
            (bannedKey) =>
              translation.includes(bannedKey) || key.includes(bannedKey)
          )
        ) {
          throw new Error(
            `Forbidden char in ${filePath}: ${key} '${translation}'.`
          );
        }
      }
    }
  };
  traverse(parsedJson);
}

function getJsonFiles(dir: any) {
  let results: any[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = `${dir}/${file}`;
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getJsonFiles(filePath));
    } else if (filePath.includes('translations') && file.endsWith('.json')) {
      results.push(filePath);
    }
  });

  return results;
}

function validateAllTranslations() {
  /* eslint-disable-next-line no-console */
  console.log('Validating translation files...');

  const basePaths: string[] = ['feature-libs', 'integration-libs', 'projects'];

  basePaths.forEach((basePath: string) => {
    const jsonFilePaths = getJsonFiles(basePath);

    jsonFilePaths.forEach((path: string) => {
      validateJson(path);
    });
  });

  /* eslint-disable-next-line no-console */
  console.log('✅ All translations passed validation!');
}

try {
  validateAllTranslations();
} catch (error) {
  /* eslint-disable-next-line no-console */
  console.error('❌ Validation failed: ', error);
  process.exit(1); // Exit with error status to stop the build
}
