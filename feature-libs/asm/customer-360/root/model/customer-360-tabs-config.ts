/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Customer360TabConfig } from './customer-360-tab-config';

export abstract class AsmCustomer360TabsConfig {
  tabs?: Array<Customer360TabConfig>;
}
