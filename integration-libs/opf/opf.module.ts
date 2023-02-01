/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfComponentsModule } from '@spartacus/opf/components';
import { OpfCoreModule } from '@spartacus/opf/core';
import { OpfOccModule } from '@spartacus/opf/occ';

@NgModule({
  imports: [OpfOccModule, OpfCoreModule, OpfComponentsModule],
})
export class OpfModule {}
