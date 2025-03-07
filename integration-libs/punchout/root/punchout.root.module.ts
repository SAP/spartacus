/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { PUNCHOUT_FEATURE } from './feature-name';
import { PunchoutStatePersistanceService } from './services/punchout-state-persistence.service';

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
    provideAppInitializer(() => {
      const punchoutPersistenceService = inject(
        PunchoutStatePersistanceService
      );
      punchoutPersistenceService.initSync();
    }),

    provideDefaultConfigFactory(defaultPunchoutCmsComponentsConfig),
  ],
})
export class PunchoutRootModule {}
