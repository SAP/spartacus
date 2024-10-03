/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  AsmCustomer360ComponentsModule,
  defaultAsmCustomer360Config,
} from '@spartacus/asm/customer-360/components';
import { AsmCustomer360CoreModule } from '@spartacus/asm/customer-360/core';
import { AsmCustomer360OccModule } from '@spartacus/asm/customer-360/occ';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  imports: [
    AsmCustomer360CoreModule,
    AsmCustomer360OccModule,
    AsmCustomer360ComponentsModule,
  ],
  providers: [provideDefaultConfig(defaultAsmCustomer360Config)],
})
export class AsmCustomer360Module {}
