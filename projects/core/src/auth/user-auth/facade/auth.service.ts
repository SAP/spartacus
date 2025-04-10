/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Config } from '@spartacus/core';
import { BehaviorSubject, EMPTY, lastValueFrom, Observable } from 'rxjs';
import { concatMap, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { RoutingService } from '../../../routing/facade/routing.service';
import { StateWithClientAuth } from '../../client-auth/store/client-auth-state';
import { OAuthTryLoginResult } from '../models/oauth-try-login-response';
import { AuthMultisiteIsolationService } from '../services/auth-multisite-isolation.service';
import { AuthRedirectService } from '../services/auth-redirect.service';
import { AuthStorageService } from '../services/auth-storage.service';
import { OAuthLibWrapperService } from '../services/oauth-lib-wrapper.service';
import { AuthActions } from '../store/actions/index';
import { UserIdService } from './user-id.service';

type CSRFResponse = {
  headerName: string;
  parameterName: string;
  token: string;
};

/**
 * Auth service for normal user authentication.
 * Use to check auth status, login/logout with different OAuth flows.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Indicates whether the access token is being refreshed
   */
  refreshInProgress$: Observable<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Indicates whether the logout is being performed
   */
  logoutInProgress$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  protected http = inject(HttpClient);

  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected authStorageService: AuthStorageService,
    protected authRedirectService: AuthRedirectService,
    protected routingService: RoutingService,
    protected authMultisiteIsolationService?: AuthMultisiteIsolationService
  ) {}

  /**
   * Check params in url and if there is an code/token then try to login with those.
   */
  async checkOAuthParamsInUrl(): Promise<void> {
    try {
      const loginResult: OAuthTryLoginResult =
        await this.oAuthLibWrapperService.tryLogin();

      const token = this.authStorageService.getItem('access_token');

      // We get the value `true` of `result` in the _code flow_ even if we did not log in successfully
      // (see source code https://github.com/manfredsteyer/angular-oauth2-oidc/blob/d95d7da788e2c1390346c66de62dc31f10d2b852/projects/lib/src/oauth-service.ts#L1711),
      // that why we also need to check if we have access_token
      if (loginResult.result && token) {
        this.userIdService.setUserId(OCC_USER_ID_CURRENT);
        this.store.dispatch(new AuthActions.Login());

        // We check if the token was received during the `tryLogin()` attempt.
        // If so, we will redirect as we can deduce we are returning from the authentication server.
        // Redirection should not be done in cases we get the token from storage (eg. refreshing the page).
        if (loginResult.tokenReceived) {
          this.authRedirectService.redirect();
        }
      }
    } catch {}
  }

  /**
   * Initialize Implicit/Authorization Code flow by redirecting to OAuth server.
   */
  loginWithRedirect(): boolean {
    this.oAuthLibWrapperService.initLoginFlow();
    return true;
  }

  /**
   * Loads a new user token with Resource Owner Password Flow.
   * @param userId
   * @param password
   */
  async loginWithCredentials(userId: string, password: string): Promise<void> {
    let uid = userId;
    if (this.authMultisiteIsolationService) {
      uid = await lastValueFrom(
        this.authMultisiteIsolationService.decorateUserId(uid)
      );
    }

    try {
      await this.oAuthLibWrapperService.authorizeWithPasswordFlow(
        uid,
        password
      );

      // OCC specific user id handling. Customize when implementing different backend
      this.userIdService.setUserId(OCC_USER_ID_CURRENT);

      this.store.dispatch(new AuthActions.Login());

      this.authRedirectService.redirect();
    } catch {}
  }

  /**
   * Loads a new user token with otp tokenCode and otp tokenId.
   * @param tokenId
   * @param tokenCode
   */
  async otpLoginWithCredentials(
    tokenId: string,
    tokenCode: string
  ): Promise<void> {
    try {
      await this.oAuthLibWrapperService.authorizeWithPasswordFlow(
        tokenId,
        tokenCode
      );

      // OCC specific user id handling. Customize when implementing different backend
      this.userIdService.setUserId(OCC_USER_ID_CURRENT);

      this.store.dispatch(new AuthActions.Login());

      this.authRedirectService.redirect();
    } catch {}
  }

  /**
   * Revokes tokens and clears state for logged user (tokens, userId).
   * To perform logout it is best to use `logout` method. Use this method with caution.
   */
  coreLogout(): Promise<void> {
    this.setLogoutProgress(true);
    this.userIdService.clearUserId();
    return new Promise((resolve) => {
      this.oAuthLibWrapperService.revokeAndLogout().finally(() => {
        this.store.dispatch(new AuthActions.Logout());
        this.setLogoutProgress(false);
        resolve();
      });
    });
  }

  /**
   * Returns `true` if the user is logged in; and `false` if the user is anonymous.
   */
  isUserLoggedIn(): Observable<boolean> {
    return this.authStorageService.getToken().pipe(
      map((userToken) => Boolean(userToken?.access_token)),
      distinctUntilChanged()
    );
  }

  /**
   * Logout a storefront customer. It will initialize logout procedure by redirecting to the `logout` endpoint.
   */
  logout(): void {
    this.routingService.go({ cxRoute: 'logout' });
  }

  /**
   * Start or stop the refresh process
   */
  setRefreshProgress(progress: boolean): void {
    (this.refreshInProgress$ as BehaviorSubject<boolean>).next(progress);
  }

  /**
   * Start or stop the logout process
   */
  setLogoutProgress(progress: boolean): void {
    (this.logoutInProgress$ as BehaviorSubject<boolean>).next(progress);
  }

  config = inject(Config);

  /** DEBUG: flag to switch between sending the login form data via _fetch_ or _form action_ */
  DEBUG_useFetch = true;

  customLoginForm(username: string, password: string) {
    // DEBUG: adjust values
    // - baseUrl in projects/core/src/auth/user-auth/config/default-auth-config.ts
    // - loginForm in projects/storefrontapp/src/app/spartacus/spartacus-b2c-configuration.module.ts:53
    const destination = `${this.config.authentication?.baseUrl}${this.config.authentication?.customLoginPage?.loginForm}`;

    return this.getCustomLoginCsrf().pipe(
      concatMap((csrf) => {
        if (this.DEBUG_useFetch) {
          // use fetch to POST form
          return this.fetchApiPostForm({
            destination,
            username,
            password,
            csrf,
          });
        } else {
          // programmatically submit login form
          return this.formActionSubmit({
            destination,
            username,
            password,
            csrf,
          });
        }
      })
    );
  }

  getCustomLoginCsrf() {
    const { baseUrl } = this.config.authentication ?? {};

    return this.http
      .get<CSRFResponse>(`${baseUrl}/authserver/csrf`, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (value) => {
            console.log('got csrf', value);
          },
          error: (e) => {
            console.log('failed to get csrf token', e);
          },
        })
      );
  }

  /**
   * login form is configured to submit via fetch APIs, so we need to create dynamically create a
   * submittable form.
   *
   * Note: This is poor UX.  An HTTP POST is an outdated process  and contrary to the SPA web application
   * paradigm.  Additionally, there are performance issues.  The entire application is will need to be
   * reloaded on every reloaded on every submit.  This will be a friction point for consumers
   * if they are on a slower connection or device.
   */
  formActionSubmit({
    destination,
    csrf,
    username,
    password,
  }: {
    destination: string;
    csrf: { parameterName: string; token: string };
    username: string;
    password: string;
  }) {
    const form = document.createElement('form');
    form.action = destination;
    form.method = 'POST';

    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = csrf.parameterName;
    csrfInput.value = csrf.token;
    form.appendChild(csrfInput);

    const usernameInput = document.createElement('input');
    usernameInput.name = 'username';
    usernameInput.value = username;
    form.appendChild(usernameInput);

    const pwInput = document.createElement('input');
    pwInput.type = 'password';
    pwInput.name = 'password';
    pwInput.value = password;
    form.appendChild(pwInput);

    document.body.appendChild(form);
    form.submit();

    return EMPTY;
  }

  /**
   * Use fetch API to post from details to server.
   *
   * Note: incomplete, only intended to get the 302 redirect to auth server or error page.
   *   Processing the location to follow later
   */
  fetchApiPostForm({
    destination,
    csrf,
    username,
    password,
  }: {
    destination: string;
    csrf: { parameterName: string; token: string };
    username: string;
    password: string;
  }) {
    // make CORS fetch request to POST login form data
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams({
      fromObject: {
        username,
        password,
        [csrf.parameterName]: csrf.token,
      },
    });

    return this.http
      .post(destination, body.toString(), {
        headers,
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        tap({
          next: (response) => {
            console.log('redirect location', response.headers.get('location'));
            debugger;
          },
          error: (error) => {
            console.log(error);
          },
        })
      );
  }
}
