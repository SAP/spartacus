/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const customerTicketingTranslations: TranslationResources = {
  en,
};

export const customerTicketingTranslationChunksConfig: TranslationChunksConfig =
  {
    customerTicketing: [
      'customerTicketing',
      'customerTicketingList',
      'createCustomerTicket',
      'customerTicketingDetails',
    ],
    myAccountV2CustomerTicketing: ['myAccountV2CustomerTicketing'],
  };
