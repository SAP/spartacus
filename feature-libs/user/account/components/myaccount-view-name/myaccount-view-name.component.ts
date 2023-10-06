/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { User, AuthService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserAccountFacade } from '../../root/facade';

@Component({
  selector: 'cx-myaccount-view-name',
  templateUrl: './myaccount-view-name.component.html',
  styleUrls: ['./myaccount-view-name.component.scss']
})
export class MyaccountViewNameComponent implements OnInit {
  user$: Observable<User | undefined>;

  constructor(
    protected auth: AuthService,
    protected userAccount: UserAccountFacade
  ) {console.log(this.user$);}

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
