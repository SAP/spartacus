/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { PickupInStoreComponentsModule } from '@spartacus/pickup-in-store/components';
import { PickupInStoreCoreModule } from '@spartacus/pickup-in-store/core';
import { PickupInStoreOccModule } from '@spartacus/pickup-in-store/occ';

@NgModule({
  imports: [
    PickupInStoreComponentsModule,
    PickupInStoreCoreModule,
    PickupInStoreOccModule,
  ],
})
export class PickupInStoreModule {}
