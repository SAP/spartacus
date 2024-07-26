/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnInit, Optional } from '@angular/core';
import { AuthService, BaseSite, BaseSiteService, useFeatureStyles } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user$: Observable<User | undefined>;
  @Optional() protected baseSiteService = inject(BaseSiteService, {
    optional: true,
  });
  loginText: string = 'miniLogin.signInRegister';

  constructor(
    private auth: AuthService,
    private userAccount: UserAccountFacade
  ) {
    useFeatureStyles('a11yMyAccountLinkOutline');
  }

  ngOnInit(): void {
    this.user$ = this.auth.isUserLoggedIn().pipe(
      switchMap((isUserLoggedIn) => {
        if (isUserLoggedIn) {
          return this.userAccount.get();
        } else {
          return of(undefined);
        }
      })
    );

    this.baseSiteService
      ?.get()
      .pipe(
        filter((site: any) => Boolean(site)),
        take(1)
      )
      .subscribe((baseSite: BaseSite) => {
        if (baseSite?.registrationEnabled === false) {
          this.loginText = 'miniLogin.signInOnly';
        }
      });
  }
}
