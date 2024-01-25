/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AsmComponentsModule } from '@spartacus/asm/components';
import { AsmCoreModule } from '@spartacus/asm/core';
import { AsmOccModule } from '@spartacus/asm/occ';

@NgModule({
  imports: [AsmComponentsModule, AsmCoreModule, AsmOccModule],
})
export class AsmModule {}
