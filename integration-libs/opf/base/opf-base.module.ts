/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfBaseCoreModule } from '@spartacus/opf/base/core';
import { OpfBaseOccModule } from '@spartacus/opf/base/occ';
import { OpfBaseComponentsModule } from './components/opf-base-components.module';

@NgModule({
  imports: [OpfBaseOccModule, OpfBaseCoreModule, OpfBaseComponentsModule],
})
export class OpfBaseModule {}
