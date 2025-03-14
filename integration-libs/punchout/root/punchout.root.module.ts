/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  AuthHttpHeaderService,
  CmsConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { PUNCHOUT_FEATURE } from './feature-name';
import { PunchoutAuthHttpHeaderService } from './services/punchout-auth-http-header.service';

export function defaultPunchoutCmsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PUNCHOUT_FEATURE]: {
        cmsComponents: ['PunchoutSessionComponent', 'PunchoutErrorComponent'],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultPunchoutCmsComponentsConfig),
    {
      provide: AuthHttpHeaderService,
      useExisting: PunchoutAuthHttpHeaderService,
    },
  ],
})
export class PunchoutRootModule {}
