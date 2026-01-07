/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AuthService,
  TranslatePipe,
  TranslationService,
  UrlPipe,
} from '@spartacus/core';
import { DomChangeDirective, PageSlotComponent } from '@spartacus/storefront';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  imports: [
    NgIf,
    PageSlotComponent,
    DomChangeDirective,
    RouterLink,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class LoginComponent implements OnInit {
  user$: Observable<User | undefined>;
  greeting$: Observable<string | undefined>;
  usingASMClient$: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private userAccount: UserAccountFacade,
    private translation: TranslationService
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
    this.greeting$ = this.user$.pipe(
      switchMap((user) =>
        this.translation.translate(`miniLogin.userGreeting`, {
          name: user?.name,
        })
      )
    );
    this.usingASMClient$ = this.auth.isUsingASMClient();
  }

  onRootNavBtnAdded($event: MutationRecord, greeting: string) {
    ($event.target as HTMLElement).setAttribute('aria-label', greeting);
  }
}
