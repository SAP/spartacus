/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { orgCustomer } from './orgCustomer';
import { total } from './total';

export interface orders {
  code: string;
  guid: string;
  orgCustomer: orgCustomer;
  placed: string;
  status: string;
  statusDisplay: string;
  total: total;
}
