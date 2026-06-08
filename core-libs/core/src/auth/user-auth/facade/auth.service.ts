/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  firstValueFrom,
  lastValueFrom,
  Observable,
} from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { FeatureToggles } from '../../../features-config/feature-toggles';
import { FeatureConfigService } from '../../../features-config/services/feature-config.service';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { RoutingService } from '../../../routing/facade/routing.service';
import { WindowRef } from '../../../window';
import { CrossSiteRequestForgeryService } from '../../client-auth';
import { StateWithClientAuth } from '../../client-auth/store/client-auth-state';
import { AuthEventType } from '../models/auth-notification.model';
import { OAuthTryLoginResult } from '../models/oauth-try-login-response';
import { AuthMultisiteIsolationService } from '../services/auth-multisite-isolation.service';
import { AuthRedirectService } from '../services/auth-redirect.service';
import { AuthStorageService } from '../services/auth-storage.service';
import { OAuthLibWrapperService } from '../services/oauth-lib-wrapper.service';
import { AuthActions } from '../store/actions/index';
import { AuthNotificationService } from './auth-notification.service';
import { UserIdService } from './user-id.service';

/**
 * Auth service for normal user authentication.
 * Use to check auth status, login/logout with different OAuth flows.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected crossSiteRequestForgeryService = inject(
    CrossSiteRequestForgeryService
  );

  /**
   * Indicates whether the access token is being refreshed
   */
  refreshInProgress$: Observable<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Indicates whether the logout is being performed
   */
  logoutInProgress$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  protected isUsingASMClient$: Observable<boolean> =
    new BehaviorSubject<boolean>(false);

  protected location = inject(Location);
  protected winRef = inject(WindowRef);

  protected csrfToken$ = this.crossSiteRequestForgeryService
    .getCsrfToken()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  private featureConfigService = inject(FeatureConfigService);
  protected featureToggles = inject(FeatureToggles);

  protected authNotificationService = inject(AuthNotificationService);
  protected notificationSubscription =
    this.authNotificationService.events$.subscribe((event) => {
      this.handleNotificationEvent(event);
    });

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

      const isEmulated = await firstValueFrom(this.userIdService.isEmulated());

      const isUsingASMClient = await firstValueFrom(this.isUsingASMClient());

      // We get the value `true` of `result` in the _code flow_ even if we did not log in successfully
      // (see source code https://github.com/manfredsteyer/angular-oauth2-oidc/blob/d95d7da788e2c1390346c66de62dc31f10d2b852/projects/lib/src/oauth-service.ts#L1711),
      // that why we also need to check if we have access_token
      if (loginResult.result && token && !isEmulated && !isUsingASMClient) {
        this.userIdService.setUserId(OCC_USER_ID_CURRENT);

        if (
          !this.featureConfigService.isEnabled(
            'dispatchLoginActionOnlyWhenTokenReceived'
          )
        ) {
          // When the feature flag is disabled, dispatch the login action even when the token
          // is retrieved from storage (e.g., page refresh)
          this.store.dispatch(new AuthActions.Login());
        }
        // We check if the token was received during the `tryLogin()` attempt.
        // If so, we will redirect as we can deduce we are returning from the authentication server.
        // Redirection should not be done in cases we get the token from storage (eg. refreshing the page).
        // In this case we need to dispatch the login action to indicate that the user has just logged in.
        if (loginResult.tokenReceived) {
          if (
            this.featureConfigService.isEnabled(
              'dispatchLoginActionOnlyWhenTokenReceived'
            )
          ) {
            this.store.dispatch(new AuthActions.Login());
          }
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
   * Retrieves the CSRF (Cross-Site Request Forgery) token for the custom login form.
   *
   * @return {string} The CSRF token used for preventing cross-site request forgery attacks.
   */
  getCsrfToken() {
    return this.csrfToken$;
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
    this.authNotificationService.sendEvent(AuthEventType.logout);
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

  /**
   * Indicates whether the ASM module is enabled.
   */
  protected isAsmEnabled(): boolean {
    if (this.isLaunched() && !this.isUsedBefore() && this.winRef.localStorage) {
      this.winRef.localStorage.setItem('asm_enabled', 'true');
    }
    return this.isLaunched() || this.isUsedBefore() || this.isEmulateInURL();
  }

  /**
   * Indicates whether ASM is launched through the URL,
   * using the asm flag in the URL.
   */
  protected isLaunched(): boolean {
    const params = this.location.path().split('?')[1];
    return !!params && params.split('&').includes('asm=true');
  }

  /**
   * check whether try to emulate customer from deeplink
   * */
  protected isEmulateInURL(): boolean {
    return this.location.path().indexOf('assisted-service/emulate?') > 0;
  }

  /**
   * Evaluates local storage where we persist the usage of ASM.
   */
  protected isUsedBefore(): boolean {
    if (this.winRef.localStorage) {
      return this.winRef.localStorage.getItem('asm_enabled') === 'true';
    } else {
      return false;
    }
  }

  protected handleNotificationEvent(event: unknown) {
    if (
      event === AuthEventType.logout &&
      !(this.logoutInProgress$ as BehaviorSubject<boolean>).getValue()
    ) {
      this.coreLogout();
    }
  }

  public refreshAuthConfig() {
    if (
      !!this.featureToggles.authorizationCodeFlowByDefault &&
      this.isAsmEnabled()
    ) {
      this.oAuthLibWrapperService.changeAuthConfigClientId('asm_client');
      this.updateIsUsingASMClient(true);
    } else {
      this.oAuthLibWrapperService.refreshAuthConfig();
      this.updateIsUsingASMClient(false);
    }
  }

  public isUsingASMClient(): Observable<boolean> {
    return this.isUsingASMClient$;
  }

  public updateIsUsingASMClient(newValue: boolean): void {
    (this.isUsingASMClient$ as BehaviorSubject<boolean>).next(newValue);
  }
}
