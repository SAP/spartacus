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
  FeatureConfigService,
  FederatedLoginService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  WindowRef,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import createSpy = jasmine.createSpy;

class MockWinRef {
  get nativeWindow(): Window {
    return {} as Window;
  }
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(of({}));
  isUserLoggedIn = createSpy().and.returnValue(of(true));
  getCsrfToken = createSpy().and.returnValue(
    of({
      headerName: 'CSFR',
      parameterName: '_csfr',
      token: 'token',
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

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled(_feature: string): boolean {
    return false;
  }
}

class MockActivatedRoute implements Partial<ActivatedRoute> {
  snapshot = {
    queryParams: { error: 'bad_credentials' },
  } as unknown as ActivatedRouteSnapshot;
}

class MockRouter implements Partial<Router> {
  navigate = createSpy().and.stub();
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getCustomLoginFormEndpoint() {
    return 'https://localhost:9002/authorizationserver/login';
  }
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
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
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
          { provide: FeatureConfigService, useClass: MockFeatureConfigService },
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
      // Reset test module to reconfigure FeatureConfigService
      beforeEach(waitForAsync(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          providers: [
            LoginFormComponentService,
            {
              provide: FeatureConfigService,
              useClass: class {
                isEnabled(_feature: string): boolean {
                  return true;
                }
              },
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
        // featureConfigService = TestBed.inject(FeatureConfigService);
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

        it('should request email', () => {
          const form = createForm(userId, password, csrf);
          const submitSpy = spyOn(form, 'submit');
          service.login(form);
          expect(submitSpy).toHaveBeenCalledWith();
        });

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

      describe('handleCustomLoginError', () => {
        it('should add error message to global message service', () => {
          service.handleCustomLoginError();

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

        it('should not add error message to global message service if error is not present', () => {
          activatedRoute.snapshot.queryParams = { error: null };
          service.handleCustomLoginError();
          expect(globalMessageService.add).not.toHaveBeenCalled();
          expect(router.navigate).not.toHaveBeenCalled();
        });
      });
    });
  });
});
