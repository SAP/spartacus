/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AccountData } from '../support/require-logged-in.commands';

export const ORDER_CODE = {
  WITH_DOCUMENTS: '5218083',
  WITH_NO_DOCUMENTS: '141672',
};

export const b2bUserAccount: AccountData = {
  registrationData: {
    email: 'james.weber@harvestlive.inc',
    password: 'welcome',
    firstName: 'James',
    lastName: 'Weber',
    titleCode: 'mr',
  },
  user: '91',
};

export const documentListExpectedFifthRow = [
  'Returns Delivery for Order 84006970',
  '7/8/25',
  '6:25 AM',
  'Completed',
];
export const documentEntryListExpectedFirstRow = [
  '10',
  '10',
  '7/8/25',
  '6:11 AM',
  'In process',
];
