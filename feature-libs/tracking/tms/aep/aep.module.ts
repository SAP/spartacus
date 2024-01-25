/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultAdobeExperiencePlatformConfig } from './config/default-aep.config';

@NgModule({
  providers: [provideDefaultConfig(defaultAdobeExperiencePlatformConfig)],
})
export class AepModule {}
