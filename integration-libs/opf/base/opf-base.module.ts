/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfBaseCoreModule } from '@spartacus/opf/base/core';
import { OpfBaseOccModule } from '@spartacus/opf/base/occ';
import { OpfBaseRootModule } from './root/opf-base-root.module';

@NgModule({
  imports: [OpfBaseOccModule, OpfBaseCoreModule, OpfBaseRootModule],
})
export class OpfBaseModule {}
