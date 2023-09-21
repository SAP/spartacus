/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-cdp-my-account-side-navigation',
  templateUrl: './cdp-my-account-name.component.html',
  styleUrls: ['./cdp-my-account-name.component.scss'],

  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdpMyAccountNameComponent implements OnInit {
  user$: Observable<User | undefined>;

  constructor(
    protected auth: AuthService,
    protected userAccount: UserAccountFacade
  ) {}

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
