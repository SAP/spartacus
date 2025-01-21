/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

type TranslationKeys<T> = {
  [K in keyof T]: string[];
};

/**
 * It extracts information about the primary keys in the various chunks of the given translations object.
 *
 * In other words, given the translations object for a single language,
 * it returns an object with the keys as the chunk names,
 * and the values as the array of primary keys in that chunk.
 *
 * @example For example, it will return the following object:
 *          ```ts
 *          {
 *            common: ['errors', 'pageMetaResolvers', ...],
 *            myAccount: ['closeAccount', 'updatePasswordForm', ...],
 *            ...
 *          }
 *          ```
 *
 *          ...when passing the following translations object as an argument:
 *          ```ts
 *          import common from './common.json';
 *          import myAccount from './myAccount.json';
 *
 *          export const en = {
 *            common,
 *            myAccount,
 *            ...
 *          }
 *          ```
 *          Where the JSON files are:
 *          ```ts
 *          // common.json
 *          {
 *            "errors": { ... },
 *            "pageMetaResolvers": { ... },
 *            ...
 *          }
 *          ```
 *
 *          ```ts
 *          // myAccount.json
 *          {
 *            "closeAccount": { ... },
 *            "updatePasswordForm": { ... },
 *            ...
 *          }
 *          ```
 */
export const extractTranslationChunksConfig = <
  T extends Record<string, object>,
>(
  translations: T
): TranslationKeys<T> =>
  Object.fromEntries(
    Object.entries(translations).map(([key, obj]) => [key, Object.keys(obj)])
  ) as TranslationKeys<T>;
