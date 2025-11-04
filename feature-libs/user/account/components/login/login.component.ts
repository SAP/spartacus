/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService, TranslationService } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent implements OnInit {
  user$: Observable<User | undefined>;
  greeting$: Observable<string | undefined>;
  usingASMClient$: Observable<boolean>;
  http: HttpClient;

  constructor(
    private auth: AuthService,
    private userAccount: UserAccountFacade,
    private translation: TranslationService
  ) {
    this.http =  inject(HttpClient);
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
    this.greeting$ = this.user$.pipe(
      switchMap((user) =>
        this.translation.translate(`miniLogin.userGreeting`, {
          name: user?.name,
        })
      )
    );
    this.usingASMClient$ = this.auth.isUsingASMClient();
    this.simplePostWithCookies();
  }


  simplePostWithCookies() {
    const postData = {};

    this.http.options('https://localhost:9002/authorizationserver/oauth/token?grant_type=saml_token&client_id=asm_client', {
        observe: 'response',
        withCredentials: true
    }).subscribe({
        next: (optionsResponse) => {
            console.log('OPTIONS preflight successful:', optionsResponse);
            this.http.post('https://localhost:9002/authorizationserver/oauth/token?grant_type=saml_token&client_id=asm_client', postData, {
                withCredentials: true
            }).subscribe({
                next: (response) => {
                    this.auth.loginWithToken((response as any));
                    console.log('POST succeed:', response);
                },
                error: (error) => {
                    console.error('POST failed:', error);
                }
            });
        },
        error: (optionsError) => {
            console.error('OPTIONS preflight failed:', optionsError);
        }
    });
  }
  onRootNavBtnAdded($event: MutationRecord, greeting: string) {
    ($event.target as HTMLElement).setAttribute('aria-label', greeting);
  }
}
