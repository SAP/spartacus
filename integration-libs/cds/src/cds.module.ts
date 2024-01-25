/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfigValidator, provideDefaultConfig } from '@spartacus/core';
import { CdsConfig, cdsConfigValidator, DEFAULT_CDS_CONFIG } from './config';
import { MerchandisingModule } from './merchandising';
import {
  ProfileTagModule,
  ProfileTagPushEventsService,
  TrackingModule,
} from './profiletag';

@NgModule({
  imports: [ProfileTagModule, TrackingModule, MerchandisingModule],
})
export class CdsModule {
  static forRoot(config?: CdsConfig): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        provideDefaultConfig(DEFAULT_CDS_CONFIG),
        provideDefaultConfig(config),
        provideConfigValidator(cdsConfigValidator),
        ProfileTagPushEventsService,
      ],
    };
  }
}
