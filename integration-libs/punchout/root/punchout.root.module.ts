/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  DEFAULT_AUTH_HTTP_HEADER_SERVICE,
  DELEGATED_AUTH_HTTP_HEADER_SERVICE,
  EXPIRED_REFRESH_TOKEN_HANDLERS,
  FeatureToggles,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  defaultPunchoutCmsComponentsConfig,
  defaultPunchoutNavigationGuardConfig,
  defaultPunchoutRoutingConfig,
} from './config';
import { PunchoutNavigationModule } from './guards/punchout-navigation.module';
import { interceptors } from './interceptors';
import {
  PunchoutAuthHttpHeaderService,
  PunchoutExpiredRefreshTokenHandler,
  PunchoutStatePersistenceService,
  PunchoutUiRestrictionService,
} from './services';

@NgModule({
  imports: [PunchoutNavigationModule],
  providers: [
    provideDefaultConfig(defaultPunchoutCmsComponentsConfig),
    provideDefaultConfig(defaultPunchoutRoutingConfig),
    provideDefaultConfig(defaultPunchoutNavigationGuardConfig),
    provideAppInitializer(() => {
      const punchoutPersistenceService = inject(
        PunchoutStatePersistenceService
      );
      punchoutPersistenceService.initSync();
    }),
    ...interceptors,
    // below provider should be removed after enableExpiredRefreshTokenHandlers is fully rolled out
    {
      provide: AuthHttpHeaderService,
      useFactory: () => {
        const featureToggles = inject(FeatureToggles);
        const delegatedAuthHttpHeaderService = inject(
          DELEGATED_AUTH_HTTP_HEADER_SERVICE,
          {
            optional: true,
          }
        );
        // delegatedService is expected to be used by ASM to address breaking changes of CXSPA-12514
        return featureToggles.enableExpiredRefreshTokenHandlers
          ? (delegatedAuthHttpHeaderService ??
              inject(DEFAULT_AUTH_HTTP_HEADER_SERVICE))
          : inject(PunchoutAuthHttpHeaderService);
      },
    },
    {
      provide: EXPIRED_REFRESH_TOKEN_HANDLERS,
      useExisting: PunchoutExpiredRefreshTokenHandler,
      multi: true,
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
  ],
})
export class PunchoutRootModule {}
