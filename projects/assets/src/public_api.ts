/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * Public API Surface of assets
 */

import { translationsEn } from './translations/translations';
export * from './translations/translation-chunks-config';
export * from './translations/translations';

/**
 * @deprecated Please use **specific language** translations (suffixed with language code) instead,
 * like in the following example:
 *             ```diff
 *               i18n: {
 *             -   resources: translations
 *             +   resources: { en: translationsEn }
 *               }
 *             ```
 */
export const translations = {
  en: translationsEn,
};
