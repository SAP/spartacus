/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import {
  combineLatest,
  defer,
  EMPTY,
  from,
  isObservable,
  Observable,
  of,
  queueScheduler,
  Subject,
  Subscription,
  using,
} from 'rxjs';
import {
  concatMap,
  defaultIfEmpty,
  filter,
  map,
  observeOn,
  pairwise,
  shareReplay,
  skipWhile,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { FeatureConfigService } from '../../../features-config/services/feature-config.service';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthToken } from '../models/auth-token.model';
import {
  EXPIRED_REFRESH_TOKEN_HANDLERS,
  ExpiredRefreshTokenHandler,
} from './auth-http-header-handler';
import { AuthRedirectService } from './auth-redirect.service';
import { AuthStorageService } from './auth-storage.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';

// Temporary compatibility tokens  to preserve legacy behavior of CXPSA-12514 fix.
// Remove DEFAULT_AUTH_HTTP_HEADER_SERVICE and
// DELEGATED_AUTH_HTTP_HEADER_SERVICE once
// enableExpiredRefreshTokenHandlers feature toggle is fully rolled out.
export const DEFAULT_AUTH_HTTP_HEADER_SERVICE =
  new InjectionToken<AuthHttpHeaderService>(
    'DEFAULT_AUTH_HTTP_HEADER_SERVICE',
    {
      providedIn: 'root',
      factory: () =>
        new AuthHttpHeaderService(
          inject(AuthService),
          inject(AuthStorageService),
          inject(OAuthLibWrapperService),
          inject(RoutingService),
          inject(OccEndpointsService),
          inject(GlobalMessageService),
          inject(AuthRedirectService)
        ),
    }
  );

/**
 * Optional delegation hook for `AuthHttpHeaderService`.
 * Feature libraries (e.g. ASM) can provide their own `AuthHttpHeaderService`
 * override under this token so that other libs (e.g. Punchout) can delegate
 * to it without a hard compile-time import of the providing library.
 */
export const DELEGATED_AUTH_HTTP_HEADER_SERVICE =
  new InjectionToken<AuthHttpHeaderService>(
    'DELEGATED_AUTH_HTTP_HEADER_SERVICE'
  );

/**
 * Extendable service for `AuthInterceptor`.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthHttpHeaderService implements OnDestroy {
  private featureConfig = inject(FeatureConfigService);

  /**
   * Starts the refresh of the access token
   */
  protected refreshTokenTrigger$ = new Subject<AuthToken | undefined>();

  /**
   * Internal token streams which reads the latest from the storage.
   * Emits the token or `undefined`
   */
  protected token$: Observable<AuthToken | undefined> = this.authStorageService
    .getToken()
    .pipe(map((token) => (token?.access_token ? token : undefined)));

  /**
   * Compares the previous and the new token in order to stop the refresh or logout processes
   */
  protected stopProgress$ = this.token$.pipe(
    // Keeps the previous and the new token
    pairwise(),
    tap(([oldToken, newToken]) => {
      // if we got the new token we know that either the refresh or logout finished
      if (oldToken?.access_token !== newToken?.access_token) {
        this.authService.setLogoutProgress(false);
        this.authService.setRefreshProgress(false);
      }
    })
  );

  /**
   * Refreshes the token only if currently there's no refresh nor logout in progress.
   * If the refresh token is not present, it triggers the logout process
   */
  protected refreshToken$ = this.refreshTokenTrigger$.pipe(
    withLatestFrom(
      this.authService.refreshInProgress$,
      this.authService.logoutInProgress$
    ),
    filter(
      ([, refreshInProgress, logoutInProgress]) =>
        !refreshInProgress && !logoutInProgress
    ),
    tap(([token]) => {
      if (token?.refresh_token) {
        this.oAuthLibWrapperService.refreshToken();
        this.authService.setRefreshProgress(true);
      } else {
        this.handleExpiredRefreshToken();
      }
    })
  );

  /**
   * Kicks of the process by listening to the new token and refresh token processes.
   * This token should be used when retrying the failed http request.
   */
  protected tokenToRetryRequest$ = using(
    () => this.refreshToken$.subscribe(),
    () => this.getStableToken()
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  protected subscriptions = new Subscription();
  protected handlers =
    inject(EXPIRED_REFRESH_TOKEN_HANDLERS, { optional: true }) ?? [];

  constructor(
    protected authService: AuthService,
    protected authStorageService: AuthStorageService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected routingService: RoutingService,
    protected occEndpoints: OccEndpointsService,
    protected globalMessageService: GlobalMessageService,
    protected authRedirectService: AuthRedirectService
  ) {
    // We need to have stopProgress$ stream active for the whole time,
    // so when the logout finishes we finish it's process.
    // It could happen when retryToken$ is not active.
    this.subscriptions.add(this.stopProgress$.subscribe());
  }

  /**
   * Checks if request should be handled by this service (if it's OCC call).
   */
  public shouldCatchError(request: HttpRequest<any>): boolean {
    return this.isOccUrl(request.url);
  }

  public shouldAddAuthorizationHeader(request: HttpRequest<any>): boolean {
    const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
    const isOccUrl = this.isOccUrl(request.url);
    return !hasAuthorizationHeader && isOccUrl;
  }

  /**
   * Adds `Authorization` header for OCC calls.
   */
  public alterRequest(
    request: HttpRequest<any>,
    token?: AuthToken
  ): HttpRequest<any> {
    const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
    const isBaseSitesRequest = this.isBaseSitesRequest(request);
    const isOccUrl = this.isOccUrl(request.url);
    if (!hasAuthorizationHeader && isOccUrl && !isBaseSitesRequest) {
      return request.clone({
        setHeaders: {
          ...this.createAuthorizationHeader(token),
        },
      });
    }
    return request;
  }

  protected isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseUrl());
  }

  protected isBaseSitesRequest(request: HttpRequest<any>): boolean {
    return request.url.includes(
      this.occEndpoints.getRawEndpointValue('baseSites')
    );
  }

  protected getAuthorizationHeader(request: HttpRequest<any>): string | null {
    const rawValue = request.headers.get('Authorization');
    return rawValue;
  }

  protected createAuthorizationHeader(
    token?: AuthToken
  ): { Authorization: string } | {} {
    if (token?.access_token) {
      return {
        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
      };
    }
    let currentToken: AuthToken | undefined;
    this.authStorageService
      .getToken()
      .subscribe((authToken) => (currentToken = authToken))
      .unsubscribe();

    if (currentToken?.access_token) {
      return {
        Authorization: `${currentToken.token_type || 'Bearer'} ${
          currentToken.access_token
        }`,
      };
    }
    return {};
  }

  /**
   * Refreshes access_token and then retries the call with the new token.
   */
  public handleExpiredAccessToken(
    request: HttpRequest<any>,
    next: HttpHandler,
    initialToken: AuthToken | undefined
  ): Observable<HttpEvent<AuthToken>> {
    return this.getValidToken(initialToken).pipe(
      switchMap((token) =>
        // we break the stream with EMPTY when we don't have the token. This prevents sending the requests with `Authorization: bearer undefined` header
        token
          ? next.handle(this.createNewRequestWithNewToken(request, token))
          : EMPTY
      )
    );
  }

  /**
   * Logout user, redirected to login page and informs about expired session.
   */
  public handleExpiredRefreshToken(): void {
    if (!this.featureConfig.isEnabled('enableExpiredRefreshTokenHandlers')) {
      this.handleExpiredRefreshTokenFallback();
      return;
    }

    from(this.authHttpHeaderHandlers)
      .pipe(
        concatMap((handler) =>
          this.resolveHandlerRefreshTokenHandling(handler)
        ),
        filter((handled) => handled),
        take(1),
        defaultIfEmpty(false)
      )
      .subscribe((handled) => {
        if (!handled) {
          this.handleExpiredRefreshTokenFallback();
        }
      });
  }

  protected handleExpiredRefreshTokenFallback(): void {
    // There might be 2 cases:
    // 1. when user is already on some page (router is stable) and performs an UI action
    // that triggers http call (i.e. button click to save data in backend)
    // 2. when user is navigating to some page and a route guard triggers the http call
    // (i.e. guard loading cms page data)
    //
    // In the second case, we want to remember the anticipated url before we navigate to
    // the login page, so we can redirect back to that URL after user authenticates.
    this.authRedirectService.saveCurrentNavigationUrl();

    // Logout user
    // TODO(#9638): Use logout route when it will support passing redirect url
    this.authService.coreLogout().finally(() => {
      this.routingService.go({ cxRoute: 'login' });

      this.globalMessageService.add(
        {
          key: 'httpHandlers.sessionExpired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  }

  /**
   * Resolves handler-specific refresh token expiration handling.
   * This approach allows features like Punchout to handle expired tokens
   * without needing to override the entire AuthHttpHeaderService via DI,
   * which would create a conflict with other service overrides (e.g., ASM).
   */
  protected resolveHandlerRefreshTokenHandling(
    handler: ExpiredRefreshTokenHandler
  ): Observable<boolean> {
    const result = handler.handleExpiredRefreshTokenIfApplicable?.();

    if (isObservable(result)) {
      return result;
    }

    return of(false);
  }

  protected get authHttpHeaderHandlers(): ExpiredRefreshTokenHandler[] {
    return this.handlers ?? [];
  }

  /**
   * Emits the token or `undefined` only when the refresh or the logout processes are finished.
   */
  getStableToken(): Observable<AuthToken | undefined> {
    return combineLatest([
      this.token$,
      this.authService.refreshInProgress$,
      this.authService.logoutInProgress$,
    ]).pipe(
      observeOn(queueScheduler),
      filter(
        ([_, refreshInProgress, logoutInProgress]) =>
          !refreshInProgress && !logoutInProgress
      ),
      switchMap(() => this.token$)
    );
  }

  /**
   * Returns a valid access token.
   * It will attempt to refresh it if the current one expired; emits after the new one is retrieved.
   */
  protected getValidToken(
    requestToken: AuthToken | undefined
  ): Observable<AuthToken | undefined> {
    return defer(() => {
      // flag to only refresh token only on first emission
      let refreshTriggered = false;
      return this.tokenToRetryRequest$.pipe(
        tap((token) => {
          // we want to refresh the access token only when it is old.
          // this is a guard for the case when there are multiple parallel http calls
          if (
            token?.access_token === requestToken?.access_token &&
            !refreshTriggered
          ) {
            this.refreshTokenTrigger$.next(token as AuthToken);
          }
          refreshTriggered = true;
        }),
        skipWhile(
          (token) => token?.access_token === requestToken?.access_token
        ),
        take(1)
      );
    });
  }

  protected createNewRequestWithNewToken(
    request: HttpRequest<any>,
    token: AuthToken
  ): HttpRequest<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
      },
    });
    return request;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
