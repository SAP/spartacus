/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  APP_BOOTSTRAP_LISTENER,
  ComponentRef,
  inject,
  ModuleWithProviders,
  NgModule,
  provideAppInitializer,
} from '@angular/core';
import {
  AuthHttpHeaderService,
  CmsConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { PUNCHOUT_FEATURE } from './feature-name';
import { interceptors } from './interceptors';
import { PunchoutStatePersistanceService } from './services';
import { PunchoutAuthHttpHeaderService } from './services/punchout-auth-http-header.service';
import { PunchoutComponentsService } from '@spartacus/punchout/components';

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
export class PunchoutRootModule {
  static forRoot(): ModuleWithProviders<PunchoutRootModule> {
    return {
      ngModule: PunchoutRootModule,
      providers: [
        {
          provide: APP_BOOTSTRAP_LISTENER,
          multi: true,
          useFactory: (): ((compRef: ComponentRef<any>) => void) => {
            const punchoutComponentsService = inject(PunchoutComponentsService);
            return (compRef: ComponentRef<any>) =>
              punchoutComponentsService.init(compRef);
          },
        },
      ],
    };
  }
}
