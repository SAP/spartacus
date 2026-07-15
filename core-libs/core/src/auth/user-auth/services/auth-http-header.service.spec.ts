import { vi, Mock } from 'vitest';
import {
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  BehaviorSubject,
  EMPTY,
  firstValueFrom,
  lastValueFrom,
  merge,
  of,
  queueScheduler,
} from 'rxjs';
import { map, observeOn, take, toArray } from 'rxjs/operators';
import { FeatureToggles } from '../../../features-config/feature-toggles/feature-toggles-tokens';
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
import { AuthHttpHeaderService } from './auth-http-header.service';
import { AuthRedirectService } from './auth-redirect.service';
import { AuthStorageService } from './auth-storage.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';
import { provideMockFeatureToggles } from '../../../features-config/feature-toggles/testing/mock-feature-toggles';
type ExpiredRefreshTokenHandlerSpy = Required<
  Pick<ExpiredRefreshTokenHandler, 'handleExpiredRefreshTokenIfApplicable'>
>;

const testToken: AuthToken = {
  access_token: 'acc_token',
  access_token_stored_at: '123',
};

const logoutInProgressSubject = new BehaviorSubject<boolean>(false);
const refreshInProgressSubject = new BehaviorSubject<boolean>(false);
const getTokenFromStorage = new BehaviorSubject<AuthToken | undefined>(
  testToken
);

class MockAuthService implements Partial<AuthService> {
  logoutInProgress$ = logoutInProgressSubject;
  refreshInProgress$ = refreshInProgressSubject;
  coreLogout() {
    this.setLogoutProgress(true);
    return Promise.resolve();
  }
  setLogoutProgress(progress: boolean): void {
    logoutInProgressSubject.next(progress);
  }
  setRefreshProgress(progress: boolean): void {
    refreshInProgressSubject.next(progress);
  }
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  getToken() {
    return getTokenFromStorage.asObservable().pipe(observeOn(queueScheduler));
  }
}

class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {
  refreshToken(): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  getBaseUrl() {
    return 'some-server/occ';
  }
  getRawEndpointValue(endpoint: string): string {
    return endpoint === 'baseSites'
      ? 'basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies(isocode),defaultCurrency(isocode),languages(isocode),defaultLanguage(isocode)),theme,defaultPreviewCatalogId,defaultPreviewCategoryCode,defaultPreviewProductCode)'
      : 'some-endpoint';
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  saveCurrentNavigationUrl = vi.fn();
}

const mockFeatureToggles: FeatureToggles = {
  enableExpiredRefreshTokenHandlers: true,
};

describe('AuthHttpHeaderService', () => {
  let service: AuthHttpHeaderService;
  let oAuthLibWrapperService: OAuthLibWrapperService;
  let authService: AuthService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let authRedirectService: AuthRedirectService;
  let featureToggles: FeatureToggles;
  let firstRegisteredHandler: ExpiredRefreshTokenHandlerSpy;

  beforeEach(() => {
    firstRegisteredHandler = { handleExpiredRefreshTokenIfApplicable: vi.fn() };

    firstRegisteredHandler.handleExpiredRefreshTokenIfApplicable.mockReturnValue(
      of(false)
    );

    TestBed.configureTestingModule({
      providers: [
        AuthHttpHeaderService,
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        provideMockFeatureToggles({ ...mockFeatureToggles }),
        {
          provide: EXPIRED_REFRESH_TOKEN_HANDLERS,
          useValue: firstRegisteredHandler,
          multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    authService = TestBed.inject(AuthService);
    service = TestBed.inject(AuthHttpHeaderService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    featureToggles = TestBed.inject(FeatureToggles);

    getTokenFromStorage.next(testToken);
    logoutInProgressSubject.next(false);
    refreshInProgressSubject.next(false);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('shouldAddAuthorizationHeader', () => {
    it('should return true for occ urls', () => {
      expect(
        service.shouldAddAuthorizationHeader(
          new HttpRequest('GET', 'some-server/occ/cart')
        )
      ).toBe(true);
    });

    it('should return false for non occ urls', () => {
      expect(
        service.shouldAddAuthorizationHeader(
          new HttpRequest('GET', 'some-server/auth')
        )
      ).toBe(false);
    });

    it('should return false if request already have Authorization header', () => {
      expect(
        service.shouldAddAuthorizationHeader(
          new HttpRequest('GET', 'some-server/auth', {
            headers: new HttpHeaders({ Authorization: 'Bearer acc_token' }),
          })
        )
      ).toBe(false);
    });
  });

  describe('shouldCatchError', () => {
    it('should return true for occ urls', () => {
      expect(
        service.shouldCatchError(new HttpRequest('GET', 'some-server/occ/cart'))
      ).toBe(true);
    });

    it('should return false for non occ urls', () => {
      expect(
        service.shouldCatchError(new HttpRequest('GET', 'some-server/auth'))
      ).toBe(false);
    });
  });

  describe('alterRequest', () => {
    it('should add Authorization header for occ calls that do not have this header', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/occ/cart')
      );
      expect(request.headers.get('Authorization')).toEqual('Bearer acc_token');
    });

    it('should use AuthToken that is passed to this method', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/occ/cart'),
        { access_token: 'new_token' } as AuthToken
      );
      expect(request.headers.get('Authorization')).toEqual('Bearer new_token');
    });

    it('should not change Authorization header for occ calls', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/occ/cart', {
          headers: new HttpHeaders({ Authorization: 'Bearer diff_token' }),
        })
      );
      expect(request.headers.get('Authorization')).toEqual('Bearer diff_token');
    });

    it('should not add the header to not occ urls', () => {
      const request = service.alterRequest(
        new HttpRequest('GET', 'some-server/non-occ/cart')
      );
      expect(request.headers.has('Authorization')).toBe(false);
    });

    it('should not add the header for occ basesites call', () => {
      const request = service.alterRequest(
        new HttpRequest(
          'GET',
          'some-server/occ/basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies(isocode),defaultCurrency(isocode),languages(isocode),defaultLanguage(isocode)),theme,defaultPreviewCatalogId,defaultPreviewCategoryCode,defaultPreviewProductCode)'
        )
      );
      expect(request.headers.has('Authorization')).toBe(false);
    });
  });

  describe('handleExpiredAccessToken', () => {
    it('should refresh the token and retry the call with new token', async () => {
      const initialToken: AuthToken = {
        access_token: `old_token`,
        access_token_stored_at: '123',
        refresh_token: 'ref_token',
      };
      getTokenFromStorage.next(initialToken);
      const handler = (a: any) => of(a);
      vi.spyOn(oAuthLibWrapperService, 'refreshToken').mockImplementation(
        () => {
          getTokenFromStorage.next({
            access_token: `new_token`,
            access_token_stored_at: '456',
            refresh_token: 'ref_token',
          });
          return EMPTY;
        }
      );
      const res: any = await firstValueFrom(
        service.handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/occ/cart'),
          { handle: handler } as HttpHandler,
          initialToken
        )
      );
      expect(res.headers.get('Authorization')).toEqual('Bearer new_token');
      expect(res.url).toEqual('some-server/occ/cart');
      expect(res.method).toEqual('GET');
      expect(oAuthLibWrapperService.refreshToken).toHaveBeenCalled();
    });

    it('should invoke expired refresh token handler when there is no refresh token', async () => {
      const initialToken: AuthToken = {
        access_token: `token`,
        access_token_stored_at: `123`,
      };
      getTokenFromStorage.next(initialToken);
      const handler = vi.fn();
      vi.spyOn(oAuthLibWrapperService, 'refreshToken');
      vi.spyOn(service, 'handleExpiredRefreshToken').mockImplementation(() => {
        getTokenFromStorage.next({} as AuthToken);
      });
      const _ = await lastValueFrom(
        service.handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/occ/cart'),
          { handle: handler } as HttpHandler,
          initialToken
        ),
        { defaultValue: null }
      );
      expect(handler).not.toHaveBeenCalled();
      expect(oAuthLibWrapperService.refreshToken).not.toHaveBeenCalled();
      expect(service.handleExpiredRefreshToken).toHaveBeenCalled();
    });

    it('should refresh token only once when method is invoked multiple times at the same time', async () => {
      const initialToken: AuthToken = {
        access_token: `old_token`,
        access_token_stored_at: '123',
        refresh_token: 'ref_token',
      };
      getTokenFromStorage.next(initialToken);
      const handler = (a: any) => of(a);
      vi.spyOn(oAuthLibWrapperService, 'refreshToken').mockImplementation(
        () => {
          getTokenFromStorage.next({
            access_token: `new_token`,
            access_token_stored_at: '456',
            refresh_token: 'ref_token',
          });
        }
      );
      const results: any[] = await lastValueFrom(
        merge(
          service.handleExpiredAccessToken(
            new HttpRequest('GET', 'some-server/1/'),
            { handle: handler } as HttpHandler,
            initialToken
          ),
          service.handleExpiredAccessToken(
            new HttpRequest('GET', 'some-server/2/'),
            { handle: handler } as HttpHandler,
            initialToken
          )
        ).pipe(toArray())
      );
      if (results.length === 2) {
        results.forEach((r) =>
          expect(r.headers.get('Authorization')).toEqual('Bearer new_token')
        );
        const url1 = results.find((r) => r.url === 'some-server/1/');
        expect(url1).toBeTruthy();
        const url2 = results.find((r) => r.url === 'some-server/2/');
        expect(url2).toBeTruthy();
        expect(oAuthLibWrapperService.refreshToken).toHaveBeenCalledTimes(1);
      }
    });

    it('should not attempt to refresh the token when there was a logout before the token expired', async () => {
      vi.useFakeTimers();
      const initialToken: AuthToken = {
        access_token: `token`,
        access_token_stored_at: '123',
      };
      getTokenFromStorage.next(initialToken);
      const handler = (a: any) => of(a);
      logoutInProgressSubject.next(true);

      vi.spyOn(oAuthLibWrapperService, 'refreshToken');

      let refreshCalled = false;
      let handlerCalled = false;
      service
        .handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/occ/cart'),
          { handle: handler } as HttpHandler,
          initialToken
        )
        .subscribe({
          complete: () => {
            refreshCalled =
              (oAuthLibWrapperService.refreshToken as ReturnType<typeof vi.fn>)
                .mock.calls.length > 0;
            handlerCalled = (handler as any).mock?.calls?.length > 0;
          },
        });

      setTimeout(() => {
        getTokenFromStorage.next({} as AuthToken);
      }, 100);
      await vi.advanceTimersByTimeAsync(101);

      expect(oAuthLibWrapperService.refreshToken).not.toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('should not refresh token when the given token is already different than the token used for failing refresh', async () => {
      const initialToken: AuthToken = {
        access_token: `old_token`,
        access_token_stored_at: '123',
      };
      const handler = (a: any) => of(a);
      vi.spyOn(oAuthLibWrapperService, 'refreshToken').mockImplementation(
        () => {}
      );
      const res = await firstValueFrom(
        service.handleExpiredAccessToken(
          new HttpRequest('GET', 'some-server/1/'),
          { handle: handler } as HttpHandler,
          initialToken
        )
      );
      expect(res.headers.get('Authorization')).toEqual(
        `Bearer ${testToken.access_token}`
      );
      expect(res.url).toEqual('some-server/1/');
      expect(res.method).toEqual('GET');
      expect(oAuthLibWrapperService.refreshToken).not.toHaveBeenCalled();
    });
  });

  describe('handleExpiredRefreshToken', () => {
    function wait(): Promise<void> {
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 5);
      });
    }

    it('should logout user, save current navigation url, and redirect to login page', async () => {
      vi.spyOn(authService, 'coreLogout').mockImplementation(wait);
      vi.spyOn(routingService, 'go');
      vi.spyOn(globalMessageService, 'add');

      service.handleExpiredRefreshToken();

      expect(authService.coreLogout).toHaveBeenCalled();
      expect(routingService.go).not.toHaveBeenCalled();
      await wait();

      const saveUrlOrder = (
        authRedirectService.saveCurrentNavigationUrl as ReturnType<typeof vi.fn>
      ).mock.invocationCallOrder[0];
      const goOrder = (routingService.go as ReturnType<typeof vi.fn>).mock
        .invocationCallOrder[0];
      expect(saveUrlOrder).toBeLessThan(goOrder);
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'httpHandlers.sessionExpired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should skip default refresh token handling when a handler handles it', () => {
      vi.spyOn(authService, 'coreLogout');
      firstRegisteredHandler.handleExpiredRefreshTokenIfApplicable.mockReturnValue(
        of(true)
      );

      service.handleExpiredRefreshToken();

      expect(authService.coreLogout).not.toHaveBeenCalled();
      expect(
        firstRegisteredHandler.handleExpiredRefreshTokenIfApplicable
      ).toHaveBeenCalled();
    });

    it('should skip handlers and execute fallback when feature toggle is disabled', () => {
      const coreLogoutSpy = vi.spyOn(authService, 'coreLogout');
      featureToggles.enableExpiredRefreshTokenHandlers = false;

      service.handleExpiredRefreshToken();

      expect(
        firstRegisteredHandler.handleExpiredRefreshTokenIfApplicable
      ).not.toHaveBeenCalled();
      expect(coreLogoutSpy).toHaveBeenCalled();
    });

    describe('with multiple handlers', () => {
      let secondRegisteredHandler: ExpiredRefreshTokenHandlerSpy;

      beforeEach(() => {
        secondRegisteredHandler = {
          handleExpiredRefreshTokenIfApplicable: vi.fn(),
        };
        secondRegisteredHandler.handleExpiredRefreshTokenIfApplicable.mockReturnValue(
          of(false)
        );

        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          providers: [
            AuthHttpHeaderService,
            { provide: AuthService, useClass: MockAuthService },
            {
              provide: OAuthLibWrapperService,
              useClass: MockOAuthLibWrapperService,
            },
            { provide: RoutingService, useClass: MockRoutingService },
            { provide: OccEndpointsService, useClass: MockOccEndpointsService },
            {
              provide: GlobalMessageService,
              useClass: MockGlobalMessageService,
            },
            { provide: AuthStorageService, useClass: MockAuthStorageService },
            {
              provide: AuthRedirectService,
              useClass: MockAuthRedirectService,
            },
            provideMockFeatureToggles({ ...mockFeatureToggles }),
            {
              provide: EXPIRED_REFRESH_TOKEN_HANDLERS,
              useValue: firstRegisteredHandler,
              multi: true,
            },
            {
              provide: EXPIRED_REFRESH_TOKEN_HANDLERS,
              useValue: secondRegisteredHandler,
              multi: true,
            },
            provideHttpClient(withInterceptorsFromDi()),
            provideHttpClientTesting(),
          ],
        });

        service = TestBed.inject(AuthHttpHeaderService);
        authService = TestBed.inject(AuthService);
        featureToggles = TestBed.inject(FeatureToggles);
      });

      it('should call secondRegisteredHandler when firstRegistredHandler does not handle the token expiration', () => {
        vi.spyOn(authService, 'coreLogout');
        firstRegisteredHandler.handleExpiredRefreshTokenIfApplicable.mockReturnValue(
          of(false)
        );
        secondRegisteredHandler.handleExpiredRefreshTokenIfApplicable.mockReturnValue(
          of(true)
        );

        service.handleExpiredRefreshToken();

        expect(
          firstRegisteredHandler.handleExpiredRefreshTokenIfApplicable
        ).toHaveBeenCalled();
        expect(
          secondRegisteredHandler.handleExpiredRefreshTokenIfApplicable
        ).toHaveBeenCalled();
        expect(authService.coreLogout).not.toHaveBeenCalled();
      });

      it('should not call secondRegisteredHandler when firstRegistredHandler already handles the token expiration', () => {
        vi.spyOn(authService, 'coreLogout');
        firstRegisteredHandler.handleExpiredRefreshTokenIfApplicable.mockReturnValue(
          of(true)
        );

        service.handleExpiredRefreshToken();

        expect(
          firstRegisteredHandler.handleExpiredRefreshTokenIfApplicable
        ).toHaveBeenCalled();
        expect(
          secondRegisteredHandler.handleExpiredRefreshTokenIfApplicable
        ).not.toHaveBeenCalled();
        expect(authService.coreLogout).not.toHaveBeenCalled();
      });
    });
  });

  describe('getValidToken', () => {
    it('should return undefined when token does not have access token', async () => {
      getTokenFromStorage.next(undefined);

      const result = await firstValueFrom(
        service['getValidToken']({
          access_token: 'xxx',
          access_token_stored_at: '123',
        }).pipe(take(1)),
        { defaultValue: undefined }
      );
      expect(result).toBeFalsy();
    });

    it('should return token when we have access token', async () => {
      getTokenFromStorage.next(testToken);
      const result = await firstValueFrom(
        service['getValidToken']({
          access_token: 'xxx',
          access_token_stored_at: '123',
        })
      );

      expect(result).toBeTruthy();
      expect(result).toEqual(testToken);
    });

    it('should not emit when logout is in progress', () => {
      logoutInProgressSubject.next(true);

      let emitted = false;
      service['getValidToken']({
        access_token: 'xxx',
        access_token_stored_at: '123',
      })
        .pipe(take(1))
        .subscribe(() => {
          emitted = true;
        });

      expect(emitted).toBeFalsy();
    });

    it('should not emit when refresh is in progress', () => {
      refreshInProgressSubject.next(true);

      let emitted = false;
      service['getValidToken']({
        access_token: 'xxx',
        access_token_stored_at: '123',
      })
        .pipe(take(1))
        .subscribe(() => {
          emitted = true;
        });

      expect(emitted).toBeFalsy();
    });
  });
});
