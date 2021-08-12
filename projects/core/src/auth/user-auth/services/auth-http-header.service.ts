import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  combineLatest,
  defer,
  EMPTY,
  Observable,
  queueScheduler,
  Subject,
  Subscription,
  using,
} from 'rxjs';
import {
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
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthStorageService } from './auth-storage.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';

/**
 * Extendable service for `AuthInterceptor`.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthHttpHeaderService implements OnDestroy {
  /**
   * Indicates whether the access token is being refreshed
   *
   * @deprecated will be removed in the next major. Use `AuthService.refreshInProgress$` instead.
   */
  // TODO:#13421 - legacy, remove this flag
  protected refreshInProgress = false;

  /**
   * Starts the refresh of the access token
   */
  protected refreshTokenTrigger$ = new Subject<AuthToken>();

  /**
   * Internal token streams which reads the latest from the storage.
   * Emits the token or `undefined`
   */
  protected token$: Observable<
    AuthToken | undefined
  > = this.authStorageService
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

  constructor(
    protected authService: AuthService,
    protected authStorageService: AuthStorageService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected routingService: RoutingService,
    protected occEndpoints: OccEndpointsService,
    protected globalMessageService: GlobalMessageService
  ) {}

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
    const isOccUrl = this.isOccUrl(request.url);
    if (!hasAuthorizationHeader && isOccUrl) {
      return request.clone({
        setHeaders: {
          ...this.createAuthorizationHeader(token),
        },
      });
    }
    return request;
  }

  protected isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
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
      .subscribe((token) => (currentToken = token))
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
    // TODO:#13421 make required
    initialToken?: AuthToken
  ): Observable<HttpEvent<AuthToken>> {
    // TODO:#13421 remove this if-statement, and just return the stream.
    if (initialToken) {
      return this.getValidToken(initialToken).pipe(
        switchMap((token) =>
          // we break the stream with EMPTY when we don't have the token. This prevents sending the requests with `Authorization: bearer undefined` header
          token
            ? next.handle(this.createNewRequestWithNewToken(request, token))
            : EMPTY
        )
      );
    }

    // TODO:#13421 legacy - remove in 5.0
    return this.handleExpiredToken().pipe(
      switchMap((token) => {
        return token
          ? next.handle(this.createNewRequestWithNewToken(request, token))
          : EMPTY;
      })
    );
  }

  /**
   * Logout user, redirected to login page and informs about expired session.
   */
  public handleExpiredRefreshToken(): void {
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

  // TODO:#13421 - remove this method
  /**
   * Attempts to refresh token if possible.
   * If it is not possible calls `handleExpiredRefreshToken`.
   *
   * @return observable which omits new access_token. (Warn: might never emit!).
   *
   * @deprecated will be removed in the next major. Use `getValidToken()` instead
   */
  protected handleExpiredToken(): Observable<AuthToken | undefined> {
    const stream = this.authStorageService.getToken();
    let oldToken: AuthToken;
    return stream.pipe(
      tap((token) => {
        if (
          token.access_token &&
          token.refresh_token &&
          !oldToken &&
          !this.refreshInProgress
        ) {
          this.refreshInProgress = true;
          this.oAuthLibWrapperService.refreshToken();
        } else if (!token.refresh_token) {
          this.handleExpiredRefreshToken();
        }
        oldToken = oldToken || token;
      }),
      filter((token) => oldToken.access_token !== token.access_token),
      tap(() => {
        this.refreshInProgress = false;
      }),
      map((token) => (token?.access_token ? token : undefined)),
      take(1)
    );
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
    requestToken: AuthToken
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
            this.refreshTokenTrigger$.next(token);
          }
          refreshTriggered = true;
        }),
        skipWhile((token) => token?.access_token === requestToken.access_token),
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
