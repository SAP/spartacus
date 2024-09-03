/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfBaseComponentsModule } from '@spartacus/opf/base/components';
import { OpfBaseCoreModule } from '@spartacus/opf/base/core';
import { OpfBaseOccModule } from '@spartacus/opf/base/occ';

@NgModule({
  imports: [OpfBaseOccModule, OpfBaseCoreModule, OpfBaseComponentsModule],
})
export class OpfBaseModule {}
