/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsmCustomer360TabConfig } from './asm-customer-360-tab-config';

export abstract class AsmCustomer360TabsConfig {
  tabs?: Array<AsmCustomer360TabConfig>;
  dateFormat?: string;
  dateTimeFormat?: string;
}
