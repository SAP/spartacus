/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { VariantsMultiDimensionalComponentsModule } from './components/variants-multi-dimensional-components.module';
import { VariantsMultiDimensionalOccModule } from './occ/variants-multi-dimensional-occ.module';

@NgModule({
  imports: [
    VariantsMultiDimensionalOccModule,
    VariantsMultiDimensionalComponentsModule,
  ],
})
export class VariantsMultiDimensionalModule {}
