/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defaultAddress } from './defaultAddress';

export interface orgCustomer {
  active: boolean;
  defaultAddress: defaultAddress;
  displayUid: String;
  firstName: String;
  lastName: String;
  name: String;
  selected: boolean;
  uid: String;
}
