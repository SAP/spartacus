import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  merge,
  Observable,
  queueScheduler,
  Subject,
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
import { AuthRedirectService } from './auth-redirect.service';
import { AuthStorageService } from './auth-storage.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';

/**
 * Extendable service for `AuthInterceptor`.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthHttpHeaderService {
  /**
   * Indicates whether the access token is being refreshed
   */
  // TODO:#13421 - legacy, remove this flag
  protected refreshInProgress = false;

  /**
   * Starts the refresh of the access token
   */
  protected refreshTokenTrigger$ = new Subject<AuthToken>();
  /**
   * Indicates whether the access token is being refreshed
   */
  protected refreshInProgress$ = new BehaviorSubject<boolean>(false);

  /**
   * Indicates whether the logout is being performed
   */
  protected logoutInProgress$ = new BehaviorSubject<boolean>(false);

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
   * Keeps the previous and the new token
   */
  protected newToken$ = this.token$.pipe(pairwise());

  /**
   * Compares the previous and the new token in order to stop the refresh or logout processes
   */
  protected stopProgress$ = this.newToken$.pipe(
    tap(([oldToken, newToken]) => {
      // if we got the new token we know that either the refresh or logout finished
      if (oldToken?.access_token !== newToken?.access_token) {
        this.refreshInProgress$.next(false);
        this.logoutInProgress$.next(false);
      }
    })
  );

  /**
   * Refreshes the token only if currently there's no refresh nor logout in progress.
   * If the refresh token is not present, it triggers the logout process
   */
  protected refreshToken$ = this.refreshTokenTrigger$.pipe(
    withLatestFrom(this.refreshInProgress$, this.logoutInProgress$),
    filter(
      ([, refreshInProgress, logoutInProgress]) =>
        !refreshInProgress && !logoutInProgress
    ),
    tap(([token]) => {
      if (token?.refresh_token) {
        this.oAuthLibWrapperService.refreshToken();
        this.refreshInProgress$.next(true);
      } else {
        this.handleExpiredRefreshToken();
        this.logoutInProgress$.next(true);
      }
    })
  );

  // TODO: name
  /**
   * Kicks of the process by listening for the new token and refresh token process.
   * It returns the token to the subscribers.
   */
  protected retryToken$ = using(
    () => merge(this.stopProgress$, this.refreshToken$).subscribe(),
    () => this.getToken()
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  constructor(
    protected authService: AuthService,
    protected authStorageService: AuthStorageService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected routingService: RoutingService,
    protected occEndpoints: OccEndpointsService,
    protected globalMessageService: GlobalMessageService,
    protected authRedirectService: AuthRedirectService
  ) {}

  /**
   * Checks if request should be handled by this service (if it's OCC call).
   */
  public shouldCatchError(request: HttpRequest<any>): boolean {
    return this.isOccUrl(request.url);
  }

  public shouldHandleRequest(request: HttpRequest<any>): boolean {
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
    return url.includes(this.occEndpoints.getBaseUrl());
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
    // TODO:#13421 remove this if-statement
    if (initialToken) {
      return this.initAndHandleExpiredToken(initialToken).pipe(
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
    // There might be 2 cases:
    // 1. when user is already on some page (router is stable) and performs an UI action
    // that triggers http call (i.e. button click to save data in backend)
    // 2. when user is navigating to some page and a route guard triggers the http call
    // (i.e. guard loading cms page data)
    //
    // In the second case, we want to remember the anticipated url before we navigate to
    // the login page, so we can redirect back to that URL after user authenticates.
    this.logoutInProgress$.next(true);
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

  // TODO:#13421 - remove this method
  /**
   * Attempts to refresh token if possible.
   * If it is not possible calls `handleExpiredRefreshToken`.
   *
   * @return observable which omits new access_token. (Warn: might never emit!).
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
   * Emits the token or `undefined` only when the refresh or the logout are done
   */
  getToken(): Observable<AuthToken | undefined> {
    return combineLatest([
      this.token$,
      this.refreshInProgress$,
      this.logoutInProgress$,
    ]).pipe(
      observeOn(queueScheduler),
      filter(
        ([_, refreshInProgress, logoutInProgress]) =>
          !refreshInProgress && !logoutInProgress
      ),
      switchMap(() => this.token$)
    );
  }

  // TODO:# naming
  initAndHandleExpiredToken(
    requestToken: AuthToken
  ): Observable<AuthToken | undefined> {
    // in order to initialize the refresh token stream (TODO: any other particular streams?), we are subscribing to the token changes
    this.retryToken$
      .pipe(take(1))
      .subscribe((token) => this.refreshTokenTrigger$.next(token));

    // TODO: again, why do we have to subscribe for the second time?
    return this.retryToken$.pipe(
      skipWhile((token) => token?.access_token === requestToken.access_token),
      take(1)
    );
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
}
