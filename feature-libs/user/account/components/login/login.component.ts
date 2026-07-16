/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AuthService,
  FeatureToggles,
  LanguageService,
  SemanticPathService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { DomChangeDirective, PageSlotComponent } from '@spartacus/storefront';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  imports: [
    NgIf,
    PageSlotComponent,
    DomChangeDirective,
    RouterLink,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class LoginComponent implements OnInit {
  user$: Observable<User | undefined>;
  greeting$: Observable<string | undefined>;
  usingASMClient$: Observable<boolean>;

  protected router = inject(Router);
  protected languageService = inject(LanguageService);
  protected urlService = inject(SemanticPathService);
  private featureToggles = inject(FeatureToggles);

  loginLink$: Observable<string | any[]> = this.featureToggles
    .fixLanguageContextLinks
    ? this.languageService
        .getActive()
        .pipe(
          map(() =>
            this.router.serializeUrl(
              this.router.createUrlTree(
                this.urlService.transform({ cxRoute: 'login' })
              )
            )
          )
        )
    : of(this.urlService.transform({ cxRoute: 'login' }));

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
