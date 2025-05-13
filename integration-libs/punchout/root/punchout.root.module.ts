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
  provideDefaultConfigFactory,
  // WindowRef,
} from '@spartacus/core';
import { PUNCHOUT_FEATURE } from './feature-name';
import { PunchoutNavigationModule } from './guards/punchout-navigation.module';
import { interceptors } from './interceptors';
import { PunchoutStatePersistanceService } from './services';
import { PunchoutAuthHttpHeaderService } from './services/punchout-auth-http-header.service';
import { PunchoutUiRestrictionService } from './services/punchout-ui-restriction.service';
// import { Router } from '@angular/router';
import { NavigationStart, Router } from '@angular/router';
// import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

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

export function backButtonGuardFactory(): () => void {
  const router = inject(Router);
  // const location = inject(Location);
  // const winRef = inject(WindowRef);

  return () => {
    router.events
      .pipe(
        filter(
          (event: NavigationStart) =>
            // event instanceof NavigationStart &&
            event.navigationTrigger === 'popstate' &&
            event.restoredState.navigationId <= 1
        )
      )
      .subscribe((event) => {
        console.log('xxxx', event, router.url);
        // router.navigateByUrl(router.url);
        // location.go(router.url);
        history.forward();
      });
  };

  // return () => {
  //   winRef.nativeWindow?.addEventListener('popstate', (event) => {
  //     const previousUrl = winRef.document?.referrer; // działa tylko przy przeładowaniu
  //     const currentUrl = router.url;
  //
  //     // jeśli wracamy do konkretnej domeny zewnętrznej
  //     console.log('xxx', event, previousUrl, currentUrl);
  //     if (event.state.navigationId === 1) {
  //       history.forward(); // zapobiegaj cofaniu
  //     }
  //   });
  // };
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
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useFactory: backButtonGuardFactory,
    },
  ],
})
export class PunchoutRootModule {}
