/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { AuthService, TranslationService } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgIf, AsyncPipe } from '@angular/common';
import { PageSlotComponent } from '../../../../../projects/storefrontlib/cms-structure/page/slot/page-slot.component';
import { DomChangeDirective } from '../../../../../projects/storefrontlib/layout/a11y/on-dom-change/dom-change.directive';
import { RouterLink } from '@angular/router';
import { UrlPipe } from '../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

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
    MockTranslatePipe,
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
