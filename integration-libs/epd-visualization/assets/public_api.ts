/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { epdVisualizationTranslationsEn } from './translations/translations';

export * from './translations/index';

/**
 * @deprecated Please use **specific language** translations (suffixed with language code) instead,
 * like in the following example:
 *             ```diff
 *               i18n: {
 *             -   resources: epdVisualizationTranslations
 *             +   resources: { en: epdVisualizationTranslationsEn }
 *               }
 *             ```
 */
export const epdVisualizationTranslations = {
  en: epdVisualizationTranslationsEn,
};
