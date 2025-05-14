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
  WindowRef,
} from '@spartacus/core';
import { PUNCHOUT_FEATURE } from './feature-name';
import { PunchoutNavigationModule } from './guards/punchout-navigation.module';
import { interceptors } from './interceptors';
import { PunchoutStatePersistanceService } from './services';
import { PunchoutAuthHttpHeaderService } from './services/punchout-auth-http-header.service';
import { PunchoutUiRestrictionService } from './services/punchout-ui-restriction.service';
import { NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter, tap } from 'rxjs/operators';

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
  const winRef = inject(WindowRef);
  const router = inject(Router);
  const location = inject(Location);
  const nativeWindow = winRef.nativeWindow;

  nativeWindow?.history.pushState(null, '', nativeWindow?.location.href);

  return () => {
    router.events
      .pipe(
        tap((event: NavigationStart) => {
          if (
            event instanceof NavigationStart &&
            event.navigationTrigger === 'popstate'
          ) {
            nativeWindow?.history.pushState(
              null,
              '',
              nativeWindow?.location.href
            );

            console.log(
              event.restoredState?.navigationId,
              winRef.document?.referrer
            );
          }
        }),
        filter(
          (event: NavigationStart) =>
            event instanceof NavigationStart &&
            event.navigationTrigger === 'popstate' &&
            event.restoredState?.navigationId <= 1
          // winRef.document?.referrer === ''
        )
      )
      .subscribe((event) => {
        console.log(
          'filtered',
          event.restoredState?.navigationId,
          winRef.document?.referrer
        );
        router.navigateByUrl(router.url);
        location.go(router.url);
        history.forward();
      });

    nativeWindow?.addEventListener('beforeunload', (event) => {
      event.preventDefault();
    });
  };

  // return () => {
  //   // // Push multiple states to history to prevent going back beyond current page
  //   // nativeWindow.history.pushState(null, '', nativeWindow.location.href);
  //   //
  //   nativeWindow?.addEventListener('popstate', (_event) => {
  //     //   // Push state again to prevent back navigation
  //     nativeWindow?.history.pushState(null, '', nativeWindow?.location.href);
  //     //   alert('Back navigation is disabled on this page.');
  //   });
  //
  //   // Optional: Warn user on page unload (close/refresh)
  //   nativeWindow?.addEventListener('beforeunload', (event) => {
  //     event.preventDefault();
  //     event.returnValue = ''; // Chrome requires returnValue to be set
  //   });
  // };

  // const router = inject(Router);
  // const location = inject(Location);
  // const winRef = inject(WindowRef);
  // return () => {
  // winRef.nativeWindow?.addEventListener('popstate', (event) => {
  //   const currentUrl = router.url;
  //   let lastUrl = router.url;
  //   event.preventDefault();
  //   winRef.nativeWindow?.history.pushState(null, '', lastUrl);
  //   console.log(
  //     lastUrl,
  //     currentUrl,
  //     winRef.document.referrer,
  //     winRef.nativeWindow?.location?.hostname
  //   );
  //   // If navigating outside app (e.g. browser back to a different origin or unloaded state)
  //   if (
  //     winRef.document.referrer &&
  //     !winRef.document.referrer.includes(
  //       winRef.nativeWindow?.location?.hostname
  //     )
  //   ) {
  //     event.preventDefault();
  //     history.pushState(null, '', lastUrl); // Push back the current state
  //     alert('Back navigation outside the app is blocked.');
  //   } else {
  //     lastUrl = currentUrl; // Allow navigation within app
  //   }
  // });
  // router.events
  //   .pipe(
  //     tap((event: NavigationStart) => {
  //       if (
  //         event instanceof NavigationStart &&
  //         event.navigationTrigger === 'popstate'
  //       ) {
  //         console.log(
  //           event.restoredState?.navigationId,
  //           winRef.document?.referrer
  //         );
  //       }
  //     }),
  //     filter(
  //       (event: NavigationStart) =>
  //         event instanceof NavigationStart &&
  //         event.navigationTrigger === 'popstate' &&
  //         event.restoredState?.navigationId <= 1
  //       // winRef.document?.referrer === ''
  //     )
  //   )
  //   .subscribe((event) => {
  //     console.log(
  //       'filtered',
  //       event.restoredState?.navigationId,
  //       winRef.document?.referrer
  //     );
  //     router.navigateByUrl(router.url);
  //     location.go(router.url);
  //     // history.forward();
  //   });
  // };

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
