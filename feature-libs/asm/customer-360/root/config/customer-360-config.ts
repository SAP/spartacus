/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsmCustomer360TabsConfig } from '../model/customer-360-tabs-config';

export abstract class Customer360Config {
  customer360?: AsmCustomer360TabsConfig;
}

declare module '@spartacus/core' {
  interface Config extends Customer360Config {}
}
