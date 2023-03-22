/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { AsmCustomer360TabsConfig } from '../model/customer-360-tabs-config';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class Customer360Config {
  customer360?: AsmCustomer360TabsConfig;
}

declare module '@spartacus/core' {
  interface Config extends Customer360Config {}
}
