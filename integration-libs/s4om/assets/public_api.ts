/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { s4omTranslationsEn } from './translations/translations';

export * from './translations/translations';

/**
 * @deprecated Please use **specific language** translations (suffixed with language code) instead,
 * like in the following example:
 *             ```diffs
 *               i18n: {
 *             -   resources: s4omTranslations
 *             +   resources: { en: s4omTranslationsEn }
 *               }
 *             ```
 */
export const s4omTranslations = {
  en: s4omTranslationsEn,
};
