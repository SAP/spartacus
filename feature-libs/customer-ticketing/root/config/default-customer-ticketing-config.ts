/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LIST_VIEW_PAGE_SIZE,
  MAX_INPUT_CHARACTERS,
  MAX_INPUT_CHARACTERS_FOR_SUBJECT,
  MAX_SIZE_FOR_ATTACHMENT,
} from '../customer-ticketing-constants';
import { CustomerTicketingConfig } from './customer-ticketing-config';

export const defaultCustomerTicketingConfig: CustomerTicketingConfig = {
  customerTicketing: {
    attachmentRestrictions: {
      maxSize: MAX_SIZE_FOR_ATTACHMENT,
      allowedTypes: [
        '.pdf',
        '.txt',
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.doc',
        '.docx',
        '.html',
        '.htm',
        '.zip',
      ],
    },
    inputCharactersLimit: MAX_INPUT_CHARACTERS,
    inputCharactersLimitForSubject: MAX_INPUT_CHARACTERS_FOR_SUBJECT,
    listViewPageSize: LIST_VIEW_PAGE_SIZE,
  },
};
