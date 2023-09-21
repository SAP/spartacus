/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  Customer360ComponentsModule,
  defaultCustomer360Config,
} from '@spartacus/asm/customer-360/components';
import { Customer360CoreModule } from '@spartacus/asm/customer-360/core';
import { Customer360OccModule } from '@spartacus/asm/customer-360/occ';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  imports: [
    Customer360CoreModule,
    Customer360OccModule,
    Customer360ComponentsModule,
  ],
  providers: [provideDefaultConfig(defaultCustomer360Config)],
})
export class Customer360Module {}
