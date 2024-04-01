/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BundleComponentsModule } from '@spartacus/cart/bundle/components';
import { BundleCoreModule } from '@spartacus/cart/bundle/core';
import { BundleOccModule } from '@spartacus/cart/bundle/occ';

@NgModule({
  imports: [
    BundleComponentsModule,
    BundleCoreModule,
    BundleOccModule,
  ],
})
export class BundleModule {}
