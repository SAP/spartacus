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
import { AuthHttpHeaderService, provideDefaultConfig } from '@spartacus/core';
import { PunchoutNavigationModule } from './guards/punchout-navigation.module';
import { interceptors } from './interceptors';
import {
  PunchoutStatePersistanceService,
  PunchoutAuthHttpHeaderService,
  PunchoutUiRestrictionService,
} from './services';
import {
  defaultPunchoutRoutingConfig,
  defaultPunchoutCmsComponentsConfig,
} from './config';

@NgModule({
  imports: [PunchoutNavigationModule],
  providers: [
    provideDefaultConfig(defaultPunchoutCmsComponentsConfig),
    provideDefaultConfig(defaultPunchoutRoutingConfig),
    provideAppInitializer(() => {
      const punchoutPersistenceService = inject(
        PunchoutStatePersistanceService
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
