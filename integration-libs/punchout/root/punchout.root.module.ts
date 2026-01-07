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
import { AuthHttpHeaderService, provideDefaultConfig } from '@spartacus/core';
import {
  defaultPunchoutCmsComponentsConfig,
  defaultPunchoutRoutingConfig,
  defaultPunchoutNavigationGuardConfig,
} from './config';
import { PunchoutNavigationModule } from './guards/punchout-navigation.module';
import { interceptors } from './interceptors';
import {
  PunchoutStatePersistenceService,
  PunchoutAuthHttpHeaderService,
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
  ],
})
export class PunchoutRootModule {}
