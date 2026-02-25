/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AccountData } from '../support/require-logged-in.commands';

export const ORDER_CODE = {
  WITH_ATTACHMENTS: '141340',
  NO_ATTACHMENTS: '141415',
};

export const FILE_NAME = {
  PREVIEWABLE: 'document.pdf',
  NOT_PREVIEWABLE: 'Archive.zip',
};

export const b2bUserAccount: AccountData = {
  user: '',
  registrationData: {
    firstName: '',
    lastName: '',
    password: 'welcome',
    titleCode: 'mr',
    email: 'james.weber@harvestlive.inc ',
  },
};
