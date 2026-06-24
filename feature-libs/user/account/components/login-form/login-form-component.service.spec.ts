import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import {
  AuthConfigService,
  AuthService,
  CsrfStateService,
  FeatureToggles,
  FederatedLoginService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OAUTH_REDIRECT_FLOW_KEY,
  provideMockFeatureToggles,
  WindowRef,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { of, throwError } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import {
  LOGIN_ERROR_KEY,
  SESSION_EXPIRED_ERROR,
} from '../user-account-constants';
import createSpy = jasmine.createSpy;

class MockWinRef {
  localStorage = jasmine.createSpyObj('localStorage', [
    'setItem',
    'removeItem',
  ]);

  sessionStorage = jasmine.createSpyObj('sessionStorage', [
    'setItem',
    'getItem',
    'removeItem',
  ]);

  location = { href: '' } as Location;

  get nativeWindow(): Window {
    return { location: this.location } as Window;
  }

  isBrowser(): boolean {
    return true;
  }
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(of({}));
  isUserLoggedIn = createSpy().and.returnValue(of(true));
  loginWithRedirect = createSpy().and.returnValue(true);
  getCsrfToken = createSpy().and.returnValue(
    of({
      headerName: 'CSFR',
      parameterName: '_csfr',
      token: 'token',
    })
  );
  refreshCsrfToken = createSpy().and.returnValue(
    of({
      headerName: 'CSFR',
      parameterName: '_csfr',
      token: 'new-token',
    })
  );
}

class MockGlobalMessageService {
  add = createSpy().and.stub();
  remove = createSpy().and.stub();
}

class MockFederatedLoginService implements Partial<FederatedLoginService> {
  isLoginDomain?: boolean | undefined = false;
}

const mockFeatureToggles: FeatureToggles = {
  authorizationCodeFlowByDefault: false,
  authorizationCodeFlowByDefaultCsrfTokenRefresh: false,
};

class MockActivatedRoute implements Partial<ActivatedRoute> {
  snapshot = {
    queryParams: { error: 'bad_credentials' },
  } as unknown as ActivatedRouteSnapshot;
  queryParams = of<{ error: string | null }>({ error: 'bad_credentials' });
}

class MockRouter implements Partial<Router> {
  navigate = createSpy().and.stub();
  navigateByUrl = createSpy().and.stub();
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getCustomLoginFormEndpoint() {
    return 'https://localhost:9002/authorizationserver/login';
  }
}

class MockCsrfStateService implements Partial<CsrfStateService> {
  get = createSpy().and.returnValue({ token: 'token' });
  set = createSpy().and.stub();
}

function createForm(username: string, password: string, csrf: string) {
  const form = document.createElement('form');
  form.action = 'https://localhost:9002/authorizationserver/login';
  form.method = 'POST';

  const csrfInput = document.createElement('input');
  csrfInput.setAttribute('type', 'hidden');
  csrfInput.setAttribute('name', '_csrf');
  csrfInput.setAttribute('value', csrf);
  form.appendChild(csrfInput);

  const usernameInput = document.createElement('input');
  usernameInput.setAttribute('name', 'username');
  usernameInput.setAttribute('value', username);
  form.appendChild(usernameInput);

  const pwInput = document.createElement('input');
  pwInput.setAttribute('type', 'password');
  pwInput.setAttribute('name', 'password');
  pwInput.setAttribute('value', password);
  form.appendChild(pwInput);

  return form;
}

describe('LoginFormComponentService', () => {
  let service: LoginFormComponentService;
  let authService: AuthService;
  let winRef: WindowRef;
  let globalMessageService: GlobalMessageService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      declarations: [],
      providers: [
        LoginFormComponentService,
        { provide: WindowRef, useClass: MockWinRef },
        { provide: AuthService, useClass: MockAuthService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: AuthConfigService, useClass: MockAuthConfigService },
        provideMockFeatureToggles({ ...mockFeatureToggles }),
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: FederatedLoginService, useClass: MockFederatedLoginService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(LoginFormComponentService);
    authService = TestBed.inject(AuthService);
    winRef = TestBed.inject(WindowRef);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  describe('showResetPassword', () => {
    it('should be true when isLoginDomain is false', () => {
      expect(service.showResetPassword).toBeTrue();
    });

    it('should be false when isLoginDomain is true', waitForAsync(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
        providers: [
          LoginFormComponentService,
          { provide: WindowRef, useClass: MockWinRef },
          { provide: AuthService, useClass: MockAuthService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          { provide: AuthConfigService, useClass: MockAuthConfigService },
          provideMockFeatureToggles({ ...mockFeatureToggles }),
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: Router, useClass: MockRouter },
          {
            provide: FederatedLoginService,
            useValue: { isLoginDomain: true },
          },
        ],
      }).compileComponents();

      service = TestBed.inject(LoginFormComponentService);

      expect(service.showResetPassword).toBe(false);
    }));
  });

  describe('login', () => {
    const userId = 'test@email.com';
    const password = 'secret';

    it('should not patch user id', () => {
      service.isUpdating$.subscribe().unsubscribe();
      expect(service.form.value.userId).toEqual('');
    });

    it('should patch user id', () => {
      spyOnProperty(winRef, 'nativeWindow', 'get').and.returnValue({
        history: { state: { newUid: 'test.user@shop.com' } },
      } as Window);
      service.isUpdating$.subscribe().unsubscribe();
      expect(service.form.value.userId).toEqual('test.user@shop.com');
    });

    describe('legacy success', () => {
      beforeEach(() => {
        service.form.setValue({
          userId,
          password,
        });
      });

      it('should request email', () => {
        service.login();
        expect(authService.loginWithCredentials).toHaveBeenCalledWith(
          userId,
          password
        );
      });

      it('should reset the form', () => {
        spyOn(service.form, 'reset').and.stub();
        service.login();
        expect(service.form.reset).toHaveBeenCalled();
      });
    });

    describe('legacy error', () => {
      beforeEach(() => {
        service.form.setValue({
          userId: 'invalid',
          password: '123',
        });
      });

      it('should not login', () => {
        service.login();
        expect(authService.loginWithCredentials).not.toHaveBeenCalled();
      });

      it('should not reset the form', () => {
        spyOn(service.form, 'reset').and.stub();
        service.login();
        expect(service.form.reset).not.toHaveBeenCalled();
      });
    });

    describe('new flow', () => {
      // Reset test module to reconfigure FeatureToggles
      beforeEach(waitForAsync(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          providers: [
            LoginFormComponentService,
            {
              provide: FeatureToggles,
              useValue: {
                authorizationCodeFlowByDefault: true,
                authorizationCodeFlowByDefaultCsrfTokenRefresh: true,
              } as FeatureToggles,
            },
            {
              provide: AuthConfigService,
              useClass: MockAuthConfigService,
            },
            {
              provide: AuthService,
              useClass: MockAuthService,
            },
            {
              provide: WindowRef,
              useClass: MockWinRef,
            },
            {
              provide: GlobalMessageService,
              useClass: MockGlobalMessageService,
            },
            {
              provide: ActivatedRoute,
              useClass: MockActivatedRoute,
            },
            {
              provide: Router,
              useClass: MockRouter,
            },
            {
              provide: FederatedLoginService,
              useClass: MockFederatedLoginService,
            },
            {
              provide: CsrfStateService,
              useClass: MockCsrfStateService,
            },
          ],
        }).compileComponents();
      }));

      beforeEach(() => {
        globalMessageService = TestBed.inject(GlobalMessageService);
        activatedRoute = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        service = TestBed.inject(LoginFormComponentService);
        authService = TestBed.inject(AuthService);
        winRef = TestBed.inject(WindowRef);
      });

      describe('success', () => {
        const userId = 'test@email.com';
        const password = 'secret';
        const csrf = 'token';

        beforeEach(() => {
          service.form.setValue({
            userId,
            password,
            csrf,
          });
        });

        it('should submit native form with refreshed CSRF token', waitForAsync(() => {
          const form = createForm(userId, password, csrf);
          const submitSpy = spyOn(form, 'submit');
          service.login(form);
          expect(submitSpy).toHaveBeenCalledWith();
          expect(winRef.localStorage?.setItem).toHaveBeenCalledWith(
            OAUTH_REDIRECT_FLOW_KEY,
            'true'
          );
        }));

        it('should update csrf form field with fresh token before submit', waitForAsync(() => {
          service.form.get('csrf')?.setValue('old-token');
          const form = createForm(userId, password, 'old-token');
          spyOn(form, 'submit');
          service.login(form);
          expect(service.form.get('csrf')?.value).toBe('new-token');
        }));

        it('should not disable the form before submitting (browser drops disabled inputs from POST body)', waitForAsync(() => {
          const form = createForm(userId, password, csrf);
          let formDisabledAtSubmit: boolean | undefined;
          spyOn(form, 'submit').and.callFake(() => {
            formDisabledAtSubmit = service.form.disabled;
          });
          service.login(form);
          expect(form.submit).toHaveBeenCalled();
          expect(formDisabledAtSubmit).toBe(false);
        }));

        it('should reset the form', () => {
          spyOn(service.form, 'reset').and.stub();
          service.login();
          expect(service.form.reset).toHaveBeenCalled();
        });
      });

      describe('error', () => {
        const userId = 'invalid';
        const password = '123';
        const csrf = 'token';

        beforeEach(() => {
          service.form.setValue({
            userId,
            password,
            csrf,
          });
        });

        it('should not login', () => {
          const form = createForm(userId, password, csrf);
          const submitSpy = spyOn(form, 'submit');
          service.login(form);
          expect(submitSpy).not.toHaveBeenCalled();
        });

        it('should not reset the form', () => {
          spyOn(service.form, 'reset').and.stub();
          const form = createForm(userId, password, csrf);
          service.login(form);
          expect(service.form.reset).not.toHaveBeenCalled();
        });
      });

      describe('when CSRF refresh fails on login submit', () => {
        const userId = 'test@email.com';
        const password = 'secret';
        const csrf = 'token';

        beforeEach(() => {
          (authService.refreshCsrfToken as jasmine.Spy).and.returnValue(
            throwError(() => ({ status: 403 }))
          );
          service.form.setValue({ userId, password, csrf });
        });

        it('should NOT submit the form', waitForAsync(() => {
          const form = createForm(userId, password, csrf);
          const submitSpy = spyOn(form, 'submit');
          service.login(form);
          expect(submitSpy).not.toHaveBeenCalled();
        }));

        it('should stash session_expired in sessionStorage and hard-redirect to /login on CSRF refresh failure', waitForAsync(() => {
          const form = createForm(userId, password, csrf);
          spyOn(form, 'submit');
          service.login(form);
          expect(winRef.sessionStorage?.setItem).toHaveBeenCalledWith(
            LOGIN_ERROR_KEY,
            SESSION_EXPIRED_ERROR
          );
          expect(winRef.nativeWindow?.location.href).toBe('/login');
          expect(authService.loginWithRedirect).not.toHaveBeenCalled();
        }));

        it('should reset busy state to false on CSRF refresh failure', waitForAsync(() => {
          const form = createForm(userId, password, csrf);
          spyOn(form, 'submit');
          let busyValue: boolean | undefined;
          service.isUpdating$.subscribe((v) => (busyValue = v));
          service.login(form);
          expect(busyValue).toBe(false);
        }));

        it('should clear the OAuth redirect flow flag on CSRF refresh failure', waitForAsync(() => {
          const form = createForm(userId, password, csrf);
          spyOn(form, 'submit');
          service.login(form);
          expect(winRef.localStorage?.removeItem).toHaveBeenCalledWith(
            OAUTH_REDIRECT_FLOW_KEY
          );
        }));

        it('should surface the session-expired message inline when nativeWindow is unexpectedly undefined (defensive fallback)', waitForAsync(() => {
          spyOnProperty(winRef, 'nativeWindow', 'get').and.returnValue(
            undefined as unknown as Window
          );
          const form = createForm(userId, password, csrf);
          spyOn(form, 'submit');
          service.login(form);
          expect(winRef.sessionStorage?.setItem).toHaveBeenCalledWith(
            LOGIN_ERROR_KEY,
            SESSION_EXPIRED_ERROR
          );
          expect(globalMessageService.add).toHaveBeenCalledWith(
            { key: 'httpHandlers.sessionExpired' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        }));
      });

      describe('when authorizationCodeFlowByDefaultCsrfTokenRefresh is disabled', () => {
        beforeEach(waitForAsync(() => {
          TestBed.resetTestingModule();
          TestBed.configureTestingModule({
            providers: [
              LoginFormComponentService,
              {
                provide: FeatureToggles,
                useValue: {
                  authorizationCodeFlowByDefault: true,
                  authorizationCodeFlowByDefaultCsrfTokenRefresh: false,
                } as FeatureToggles,
              },
              { provide: AuthConfigService, useClass: MockAuthConfigService },
              { provide: AuthService, useClass: MockAuthService },
              { provide: WindowRef, useClass: MockWinRef },
              {
                provide: GlobalMessageService,
                useClass: MockGlobalMessageService,
              },
              { provide: ActivatedRoute, useClass: MockActivatedRoute },
              { provide: Router, useClass: MockRouter },
              {
                provide: FederatedLoginService,
                useClass: MockFederatedLoginService,
              },
              {
                provide: CsrfStateService,
                useClass: MockCsrfStateService,
              },
            ],
          }).compileComponents();
        }));

        beforeEach(() => {
          service = TestBed.inject(LoginFormComponentService);
          authService = TestBed.inject(AuthService);
          winRef = TestBed.inject(WindowRef);
        });

        it('should submit synchronously without refreshing CSRF token', () => {
          service.form.setValue({
            userId: 'test@email.com',
            password: 'secret',
            csrf: 'token',
          });
          const form = createForm('test@email.com', 'secret', 'token');
          const submitSpy = spyOn(form, 'submit');
          service.login(form);
          expect(submitSpy).toHaveBeenCalled();
          expect(authService.refreshCsrfToken).not.toHaveBeenCalled();
        });
      });

      describe('handleCustomLoginError', () => {
        it('should add error message to global message service', () => {
          service.handleCustomLoginError();

          expect(winRef.localStorage?.removeItem).toHaveBeenCalledWith(
            OAUTH_REDIRECT_FLOW_KEY
          );
          expect(globalMessageService.add).toHaveBeenCalledWith(
            {
              key: 'customLoginPage.badRequest.bad_credentials',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          expect(router.navigate).toHaveBeenCalledWith([], {
            queryParams: { error: null },
          });
        });

        it('should drain a session_expired stash from sessionStorage and surface httpHandlers.sessionExpired', () => {
          (winRef.sessionStorage?.getItem as jasmine.Spy).and.callFake(
            (key: string) =>
              key === LOGIN_ERROR_KEY ? SESSION_EXPIRED_ERROR : null
          );
          service.handleCustomLoginError();
          expect(winRef.sessionStorage?.removeItem).toHaveBeenCalledWith(
            LOGIN_ERROR_KEY
          );
          expect(globalMessageService.add).toHaveBeenCalledWith(
            { key: 'httpHandlers.sessionExpired' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        });

        it('should map error=session_expired to the httpHandlers.sessionExpired key (reused from the global session-expired message)', () => {
          (activatedRoute as any).queryParams = of({
            error: 'session_expired',
          });
          service.handleCustomLoginError();
          expect(globalMessageService.add).toHaveBeenCalledWith(
            { key: 'httpHandlers.sessionExpired' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          expect(router.navigate).toHaveBeenCalledWith([], {
            queryParams: { error: null },
          });
        });

        it('should not add error message to global message service if error is not present', () => {
          (activatedRoute as any).queryParams = of({ error: null });
          service.handleCustomLoginError();
          expect(winRef.localStorage?.removeItem).not.toHaveBeenCalled();
          expect(globalMessageService.add).not.toHaveBeenCalled();
          expect(router.navigate).not.toHaveBeenCalled();
        });
      });

      describe('SSR (isBrowser = false)', () => {
        const userId = 'test@email.com';
        const password = 'secret';
        const csrf = 'token';

        beforeEach(() => {
          spyOn(winRef, 'isBrowser').and.returnValue(false);
          service.form.setValue({ userId, password, csrf });
        });

        it('should not set localStorage flag when submitting login form', () => {
          const form = createForm(userId, password, csrf);
          spyOn(form, 'submit');
          service.login(form);
          expect(winRef.localStorage?.setItem).not.toHaveBeenCalled();
        });

        it('should not remove localStorage flag when handling login error', () => {
          service.handleCustomLoginError();
          expect(winRef.localStorage?.removeItem).not.toHaveBeenCalled();
        });
      });

      describe('resolveLoginErrorKey', () => {
        it('should map session_expired to httpHandlers.sessionExpired', () => {
          expect(
            (service as any).resolveLoginErrorKey(SESSION_EXPIRED_ERROR)
          ).toBe('httpHandlers.sessionExpired');
        });

        it('should map bad_credentials to customLoginPage.badRequest.bad_credentials', () => {
          expect((service as any).resolveLoginErrorKey('bad_credentials')).toBe(
            'customLoginPage.badRequest.bad_credentials'
          );
        });

        it('should map account_disabled to customLoginPage.badRequest.account_disabled', () => {
          expect(
            (service as any).resolveLoginErrorKey('account_disabled')
          ).toBe('customLoginPage.badRequest.account_disabled');
        });

        it('should map unknown error codes to customLoginPage.badRequest.unknown_error', () => {
          expect(
            (service as any).resolveLoginErrorKey('some_unknown_error')
          ).toBe('customLoginPage.badRequest.unknown_error');
        });
      });
    });
  });
});
