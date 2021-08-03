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
  protected refreshInProgress = false;
  protected refreshInProgress$ = new BehaviorSubject<boolean>(false);

  protected logoutInProgress = false;
  protected logoutInProgress$ = new BehaviorSubject<boolean>(false);

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
      .subscribe((tok) => (currentToken = tok))
      .unsubscribe();

    if (currentToken?.access_token) {
      console.error('I dont want to be here ever');
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
    initialRequestToken?: AuthToken
  ): Observable<HttpEvent<AuthToken>> {
    if (initialRequestToken) {
      return this.handleExpiredToken$(initialRequestToken).pipe(
        switchMap((token) => {
          return token
            ? next.handle(this.createNewRequestWithNewToken(request, token))
            : EMPTY;
        })
      );
    }
    console.error('Bad place to be');
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
    console.log('expired refresh, logout');
    this.logoutInProgress$.next(true);
    this.authRedirectService.saveCurrentNavigationUrl();

    // Logout user
    // TODO(#9638): Use logout route when it will support passing redirect url
    this.authService.coreLogout();
    console.log('logout please');

    this.routingService.go({ cxRoute: 'login' });

    this.globalMessageService.add(
      {
        key: 'httpHandlers.sessionExpired',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  /**
   * Attempts to refresh token if possible.
   * If it is not possible calls `handleExpiredRefreshToken`.
   *
   * @return observable which omits new access_token. (Warn: might never emit!).
   */
  protected handleExpiredToken(): Observable<AuthToken | undefined> {
    const stream = this.authStorageService.getToken();
    console.error('Errorrrrrrrrr');
    let oldToken: AuthToken;
    return stream.pipe(
      tap((token) => {
        console.log('call', this.refreshInProgress);
        if (
          token.access_token &&
          token.refresh_token &&
          !oldToken &&
          !this.refreshInProgress
        ) {
          console.log('started refresh');
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
        console.log('finished refresh');
      }),
      map((token) => (token?.access_token ? token : undefined)),
      take(1)
    );
  }

  // requirements
  // 1. as soon as we set refreshInProgress or logoutInProgress we should emit null or we should not emit anything
  // 2. when we get new tokens we know that refreshInProgress finished
  // 3. when we get empty token we know that logoutInProgress finished
  // 4. tokens can emit multiple times (properties change one by one)
  // 5. Do we need scan?

  protected token$: Observable<
    AuthToken | undefined
  > = this.authStorageService.getToken().pipe(
    tap((token) => console.log(token)),
    map((token) => (token?.access_token ? token : undefined))
  );

  getToken(): Observable<AuthToken | undefined> {
    return combineLatest([
      this.token$,
      this.refreshInProgress$,
      this.logoutInProgress$,
    ]).pipe(
      filter(
        ([_, refreshInProgress, logoutInProgress]) =>
          !refreshInProgress && !logoutInProgress
      ),
      map(([token]) => token),
      take(1)
    );
  }

  protected tokenTaps$ = combineLatest([
    this.token$,
    this.refreshInProgress$,
    this.logoutInProgress$,
  ]).pipe(
    observeOn(queueScheduler),
    tap(([token]) => {
      if (token?.refresh_token) {
      }
    })
  );

  protected refreshTokenTrigger$ = new Subject<AuthToken>();

  protected refreshToken$ = this.refreshTokenTrigger$.pipe(
    withLatestFrom(this.refreshInProgress$, this.logoutInProgress$),
    filter(
      ([, refreshInProgress, logoutInProgress]) =>
        !refreshInProgress && !logoutInProgress
    ),
    tap(([token]) => {
      if (token?.refresh_token) {
        this.refreshInProgress$.next(true);
        this.oAuthLibWrapperService.refreshToken();
      } else {
        this.handleExpiredRefreshToken();
        this.logoutInProgress$.next(true);
      }
    })
  );

  protected tokenFinished$ = this.token$.pipe(
    pairwise(),
    tap(([oldToken, newToken]) => {
      // we get new token, so we know that we either finished refresh or logout
      if (oldToken?.access_token !== newToken?.access_token) {
        this.refreshInProgress$.next(false);
        this.logoutInProgress$.next(false);
      }
    })
  );
  protected retryToken$ = using(
    () => merge(this.tokenFinished$, this.refreshToken$).subscribe(),
    () => this.getToken()
  ).pipe(shareReplay(1));

  handleExpiredToken$(
    requestToken: AuthToken
  ): Observable<AuthToken | undefined> {
    this.refreshTokenTrigger$.next(requestToken);

    return this.retryToken$;

    return combineLatest([
      this.token$,
      this.refreshInProgress$.pipe(observeOn(queueScheduler)),
      this.logoutInProgress$.pipe(observeOn(queueScheduler)),
    ]).pipe(
      tap((str) => console.log(str)),
      tap(([token]) => {
        // we get new token, so we know that we either finished refresh or logout
        if (token?.access_token !== requestToken.access_token) {
          this.refreshInProgress$.next(false);
          this.logoutInProgress$.next(false);
        }
      }),
      tap(([token, refreshInProgress, logoutInProgress]) => {
        if (
          token?.access_token === requestToken.access_token &&
          token?.access_token &&
          token?.refresh_token &&
          !refreshInProgress &&
          !logoutInProgress
        ) {
          this.oAuthLibWrapperService.refreshToken();
          this.refreshInProgress$.next(true);
          console.log('start refresh');
        } else if (
          token?.access_token === requestToken.access_token &&
          !token?.refresh_token &&
          !logoutInProgress &&
          !refreshInProgress
        ) {
          this.handleExpiredRefreshToken();
        }
      }),
      filter(([token]) => token?.access_token !== requestToken.access_token),
      filter(
        ([_, refreshInProgress, logoutInProgress]) =>
          !refreshInProgress && !logoutInProgress
      ),
      map(([token]) => token),
      take(1)
    );
  }

  // - 1 call
  // - 3 call
  // - 1 fail
  // - 1 attempt to refresh - true
  // - 2 call
  // - 1 refreshed token - false // process already completed
  // - 2 fail -
  // - 2 attempt to refresh

  // - still do one call that will be 401

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
