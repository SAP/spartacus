/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { productVariantsTranslationsEn } from './translations/translations';

export * from './translations/translations';

/**
 * @deprecated Please use **specific language** translations (suffixed with language code) instead,
 * like in the following example:
 *             ```diff
 *               i18n: {
 *             -   resources: productVariantsTranslations
 *             +   resources: { en: productVariantsTranslationsEn }
 *               }
 *             ```
 */
export const productVariantsTranslations = {
  en: productVariantsTranslationsEn,
};
