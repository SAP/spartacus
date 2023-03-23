/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
// import { ICON_TYPE } from 'projects/storefrontlib/cms-components/misc/icon/index';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-cdp-side',
  templateUrl: './cdp-my-account-side-navigation.component.html',
  styleUrls: ['./cdp-my-account-side-navigation.component.scss'],
})
export class CdpMyAccountSideNavigationComponent implements OnInit {
  user$: Observable<User | undefined>;
  iconTypes = ICON_TYPE;

  constructor(
    protected auth: AuthService,
    protected userAccount: UserAccountFacade
  ) {
    // eslint-disable-next-line constructor-super
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
  }
}
