/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnInit } from '@angular/core';
import {
  AuthService,
  LanguageService,
  SiteThemeService,
  UserIdService,
} from '@spartacus/core';
import { StorefrontComponent } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { combineLatest, map, of, switchMap, take } from 'rxjs';

/**
 * Root component that belongs to the example app, not Spartacus libraries.
 * In customers' applications, the analogical root AppComponent belongs to the custom app.
 */
@Component({
  selector: 'app-root',
  template: `<cx-storefront></cx-storefront>`,
  imports: [StorefrontComponent],
})
export class AppComponent implements OnInit {
  theme = '<customerWalkMeEditorThemeName>';

  languageService = inject(LanguageService);

  userIdService = inject(UserIdService);

  authService = inject(AuthService);
  userAccount = inject(UserAccountFacade);

  siteThemeService = inject(SiteThemeService);

  user$ = this.authService.isUserLoggedIn().pipe(
    switchMap((isUserLoggedIn) => {
      if (isUserLoggedIn) {
        return this.userAccount.get();
      } else {
        return of(undefined);
      }
    }),
    map((user) => user?.uid)
  );

  listenForEndUserId() {
    this.user$.subscribe((userId) => {
      (window as any).walkmeLoaderConfig.endUserId = userId;
    });
  }
  listenForLanguage() {
    this.languageService.getActive().subscribe((lang) => {
      (window as any).walkmeLoaderConfig.language = lang;
    });
  }
  listenForTheme() {
    this.siteThemeService.getActive().subscribe((theme) => {
      (window as any).walkmeLoaderConfig.theme = theme;
    });
  }

  ngOnInit(): void {
    combineLatest({
      language: this.languageService.getActive(),
      endUserId: this.user$,
      theme: this.siteThemeService.getActive(),
    })
      .pipe(take(1))
      .subscribe(({ language, endUserId, theme }) => {
        console.log('initializing WalkMe script', language, endUserId, theme);

        const isWalkmeEnabled = true;
        (window as any).walkmeLoaderConfig = {
          systemUrl: '',
          customerSystemUrl:
            'https://cdn-us01.walkme.cloud.sap/users/7cf1ce06f25545faa95ac694d39e7f01/test/walkme_7cf1ce06f25545faa95ac694d39e7f01_https.js',
          enableAnalytics: true,
          tenantId: '<customer name>',
          endUserId,
          language,
          theme,
          wmCmpMode: 2,
        };
        if (isWalkmeEnabled) {
          const walkme = document.createElement('script');
          walkme.async = true;
          walkme.src =
            'https://cdn.walkme.cloud.sap/SAP/WalkmeLoader/main_v1.js';
          const s = document.getElementsByTagName('script')[0];
          s.parentNode!.insertBefore(walkme, s);
          (window as any).walkme_ready = () => {
            console.log('walkme loaded, show help icon');
          };
        }

        this.listenForEndUserId();
        this.listenForLanguage();
        this.listenForTheme();
      });
  }
}
