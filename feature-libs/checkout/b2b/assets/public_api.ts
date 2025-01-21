/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { checkoutB2BTranslationsEn } from './translations/translations';

export * from './translations/translations';

/**
 * @deprecated Please use **specific language** translations (suffixed with language code) instead,
 * like in the following example:
 *             ```diff
 *               i18n: {
 *             -   resources: checkoutB2BTranslations
 *             +   resources: { en: checkoutB2BTranslationsEn }
 *               }
 *             ```
 */
export const checkoutB2BTranslations = {
  en: checkoutB2BTranslationsEn,
};
