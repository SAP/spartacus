/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { facadeProviders } from './auth/facade/facade-providers';
import { CdcEventModule } from './events/cdc-event.module';
import { CdcStoreModule } from './store/cdc-store.module';

@NgModule({
  imports: [CdcAuthModule, CdcEventModule, CdcStoreModule],
  providers: [...facadeProviders],
})
export class CdcCoreModule {}
