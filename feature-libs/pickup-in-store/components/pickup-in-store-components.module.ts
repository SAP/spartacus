/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import {
  defaultPickupOptionsDialogLayoutConfig,
  MyPreferredStoreModule,
  PickupInfoContainerModule,
} from './container/index';
import { PickUpItemsDetailsModule } from './presentational/pickup-items-details/pickup-items-details.module';
import { PickupOptionsModule } from './presentational/pickup-options/pickup-options.module';
@NgModule({
  imports: [
    ReactiveFormsModule,
    PickupInfoContainerModule,
    MyPreferredStoreModule,
    PickUpItemsDetailsModule,
    PickupOptionsModule,
  ],
  providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
})
export class PickupInStoreComponentsModule {}
