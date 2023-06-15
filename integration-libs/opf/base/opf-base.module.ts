/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfBaseCoreModule } from '@spartacus/opf/base/core';
import { OpfBaseOccModule } from '@spartacus/opf/base/occ';
import { OpfOrderOverviewsModule } from './components/opf-order-overview/opf-order-overview.module';

@NgModule({
  imports: [OpfBaseOccModule, OpfBaseCoreModule, OpfOrderOverviewsModule],
})
export class OpfBaseModule {}
