/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { AddedToCartDialogEventListener } from '@spartacus/cart/base/components';
import {
  AuthHttpHeaderService,
  CmsConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { PUNCHOUT_FEATURE } from './feature-name';
import { interceptors } from './interceptors';
import {
  PunchoutAddedToCartDialogEventListener,
  PunchoutStatePersistanceService,
} from './services';
import { PunchoutAuthHttpHeaderService } from './services/punchout-auth-http-header.service';

export function defaultPunchoutCmsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PUNCHOUT_FEATURE]: {
        cmsComponents: [
          'PunchoutSessionComponent',
          'PunchoutErrorComponent',
          'PunchoutButtonsComponent',
          'PunchoutRequisitionComponent',
          'PunchoutCloseSessionComponent',
          'PunchoutInspectCartComponent',
        ],
      },
    },
  };
  return config;
}

export function punchoutStatePersistenceFactory(): () => void {
  const punchoutPersistenceService = inject(PunchoutStatePersistanceService);
  return () => punchoutPersistenceService.initSync();
}

@NgModule({
  providers: [
    {
      provide: AddedToCartDialogEventListener,
      useClass: PunchoutAddedToCartDialogEventListener,
    },
    provideAppInitializer(() => {
      const punchoutPersistenceService = inject(
        PunchoutStatePersistanceService
      );
      punchoutPersistenceService.initSync();
    }),
    ...interceptors,
    provideDefaultConfigFactory(defaultPunchoutCmsComponentsConfig),
    {
      provide: AuthHttpHeaderService,
      useExisting: PunchoutAuthHttpHeaderService,
    },
  ],
})
export class PunchoutRootModule {}
