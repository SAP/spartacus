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
import { PunchoutStatePersistanceService } from './services';
import { PunchoutAuthHttpHeaderService } from './services/punchout-auth-http-header.service';
import { PunchoutUiRestrictionService } from './services/punchout-ui-restriction.service';
import { defaultPunchoutRoutingConfig } from './config';
import { defaultPunchoutCmsComponentsConfig } from './config/default-punchout-cms-component-config';

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
    provideDefaultConfig(defaultPunchoutCmsComponentsConfig),
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
    provideDefaultConfig(defaultPunchoutRoutingConfig),
  ],
})
export class PunchoutRootModule {}
