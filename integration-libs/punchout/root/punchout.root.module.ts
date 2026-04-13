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
  AUTH_HTTP_HEADER_CONTRIBUTORS,
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
    {
      provide: AUTH_HTTP_HEADER_CONTRIBUTORS,
      useExisting: PunchoutAuthHttpHeaderService,
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
