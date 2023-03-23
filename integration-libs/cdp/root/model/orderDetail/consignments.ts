/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { entries } from './entries';
import { shippingAddress } from './shippingAddress';

export interface consignments {
  code: string;
  shippingAddress: shippingAddress;
  status: string;
  statusDisplay: string;
  entries: entries[];
}
