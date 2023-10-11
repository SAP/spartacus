/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AsmCustomer360TabsConfig } from '@spartacus/asm/customer-360/root';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class AsmCustomer360Config {
  asmCustomer360?: AsmCustomer360TabsConfig;
}

declare module '@spartacus/core' {
  interface Config extends AsmCustomer360Config {}
}
