/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig } from '@spartacus/core';

export const orderTranslationChunksConfig: TranslationChunksConfig = {
  myAccountV2Order: [
    'myAccountV2OrderHistory',
    'myAccountV2OrderDetails',
    'myAccountV2Orders',
  ],
  order: [
    'orderDetails',
    'orderHistory',
    'AccountOrderHistoryTabContainer',
    'returnRequestList',
    'returnRequest',
    'reorder',
  ],
};

export { cs as orderTranslationsCs } from './cs/index';
export { de as orderTranslationsDe } from './de/index';
export { en as orderTranslationsEn } from './en/index';
export { es as orderTranslationsEs } from './es/index';
export { es_CO as orderTranslationsEs_CO } from './es_CO/index';
export { fr as orderTranslationsFr } from './fr/index';
export { hi as orderTranslationsHi } from './hi/index';
export { hu as orderTranslationsHu } from './hu/index';
export { id as orderTranslationsId } from './id/index';
export { it as orderTranslationsIt } from './it/index';
export { ja as orderTranslationsJa } from './ja/index';
export { ko as orderTranslationsKo } from './ko/index';
export { pl as orderTranslationsPl } from './pl/index';
export { pt as orderTranslationsPt } from './pt/index';
export { ru as orderTranslationsRu } from './ru/index';
export { zh as orderTranslationsZh } from './zh/index';
export { zh_TW as orderTranslationsZh_TW } from './zh_TW/index';
