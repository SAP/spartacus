/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  APP_BOOTSTRAP_LISTENER,
  ComponentRef,
  inject,
  NgModule,
  provideAppInitializer,
} from '@angular/core';
import {
  AuthHttpHeaderService,
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import { PUNCHOUT_FEATURE } from './feature-name';
import { PunchoutNavigationModule } from './guards/punchout-navigation.module';
import { interceptors } from './interceptors';
import { PunchoutStatePersistanceService } from './services';
import { PunchoutAuthHttpHeaderService } from './services/punchout-auth-http-header.service';
import { PunchoutUiRestrictionService } from './services/punchout-ui-restriction.service';
import { PUNCHOUT_SESSION_PAGE_URL } from './model';

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
  imports: [PunchoutNavigationModule],
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
    PunchoutUiRestrictionService,
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useFactory: (): ((compRef: ComponentRef<any>) => void) => {
        const punchoutComponentsService = inject(PunchoutUiRestrictionService);
        return (compRef: ComponentRef<any>) =>
          punchoutComponentsService.init(compRef);
      },
    },
    provideDefaultConfig({
      routing: {
        routes: {
          punchoutSession: {
            paths: [PUNCHOUT_SESSION_PAGE_URL],
            protected: false,
            authFlow: true,
          },
        },
      },
    } as RoutingConfig),
  ],
})
export class PunchoutRootModule {}
