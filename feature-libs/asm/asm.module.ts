/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AsmComponentsModule } from '@commerce-storefront-toolset/asm/components';
import { AsmCoreModule } from '@commerce-storefront-toolset/asm/core';
import { AsmOccModule } from '@commerce-storefront-toolset/asm/occ';

@NgModule({
  imports: [AsmComponentsModule, AsmCoreModule, AsmOccModule],
})
export class AsmModule {}
