import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthMultisiteIsolationService,
  AuthService,
  FederatedLoginService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  WindowRef,
} from '@spartacus/core';
import { LoginFormComponentService } from '@spartacus/user/account/components';
import { FormErrorsModule } from '@spartacus/storefront';
import { Observable, of, throwError } from 'rxjs';
import { CdcLoginFormComponentService } from './cdc-login-form-component.service';

class MockWinRef {
  get nativeWindow(): Window {
    return {} as Window;
  }
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = vi.fn().mockReturnValue(of({}));
  isUserLoggedIn = vi.fn().mockReturnValue(of(true));
  getCsrfToken = vi.fn().mockReturnValue(
    of({
      headerName: 'CSFR',
      parameterName: '_csfr',
      token: 'token',
    })
  );
}

class MockGlobalMessageService {
  add = vi.fn().mockImplementation(() => {});
  remove = vi.fn().mockImplementation(() => {});
}

class MockCDCJsService implements Partial<CdcJsService> {
  didLoad = vi.fn().mockReturnValueOnce(of(true)).mockReturnValueOnce(of(false));
  registerUserWithoutScreenSet = vi.fn().mockImplementation(() =>
    of({ status: 'OK' })
  );
  loginUserWithoutScreenSet = vi.fn().mockReturnValueOnce(of(true));
}

class MockLoginFormComponentService
  implements Partial<LoginFormComponentService>
{
  login = vi.fn();
}

class MockActivatedRoute implements Partial<ActivatedRoute> {
  snapshot = {
    queryParams: {
      error: 'bad_credentials',
    },
  } as unknown as ActivatedRouteSnapshot;
}

class MockRouter implements Partial<Router> {
  navigate = vi.fn().mockImplementation(() => {});
}

class MockFederatedLoginService implements Partial<FederatedLoginService> {
  isLoginDomain?: boolean | undefined = false;
}

class MockAuthMultisiteIsolationService
  implements Partial<AuthMultisiteIsolationService>
{
  decorateUserId(userId: string): Observable<string> {
    return of(userId);
  }
}

describe('CdcLoginComponentService', () => {
  let cdcLoginService: CdcLoginFormComponentService;
  let cdcJsService: CdcJsService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      declarations: [],
      providers: [
        CdcLoginFormComponentService,
        { provide: WindowRef, useClass: MockWinRef },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Store, useValue: { dispatch: () => {} } },
        { provide: CdcJsService, useClass: MockCDCJsService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        {
          provide: LoginFormComponentService,
          useClass: MockLoginFormComponentService,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
        { provide: FederatedLoginService, useClass: MockFederatedLoginService },
        {
          provide: AuthMultisiteIsolationService,
          useClass: MockAuthMultisiteIsolationService,
        },
      ],
    });
  });

  beforeEach(() => {
    cdcLoginService = TestBed.inject(CdcLoginFormComponentService);
    cdcJsService = TestBed.inject(CdcJsService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    TestBed.compileComponents();
  });

  it('should create service', () => {
    expect(cdcLoginService).toBeTruthy();
  });

  describe('Login', () => {
    const userId = 'test@email.com';
    const password = 'secret';

    it('should happen with CDC', () => {
      cdcLoginService.form.setValue({
        userId: userId,
        password: password,
      });
      cdcLoginService.login();
      expect(cdcJsService.loginUserWithoutScreenSet).toHaveBeenCalledWith(
        userId,
        password
      );
      expect(cdcLoginService['busy$'].value).toBe(false);
    });

    it('should handle a failed request through CDC SDK', () => {
      cdcJsService.didLoad = vi.fn().mockReturnValue(of(true));
      (cdcJsService.loginUserWithoutScreenSet as any).mockReturnValue(
        throwError(() => 'test error: such email does not exist!')
      );
      cdcLoginService.login();
      expect(cdcLoginService['busy$'].value).toBe(false);
    });

    it('should NOT happen without CDC, should show error', () => {
      cdcLoginService.form.setValue({
        userId: userId,
        password: password,
      });
      cdcJsService.didLoad = vi.fn().mockReturnValue(of(false));
      cdcLoginService.login();
      expect(cdcJsService.loginUserWithoutScreenSet).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'errorHandlers.scriptFailedToLoad',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(cdcLoginService['busy$'].value).toBe(false);
    });

    describe('when email is invalid', () => {
      beforeEach(() => {
        cdcLoginService.form.setValue({
          userId: 'invalid.email',
          password: 'password',
        });
      });

      it('should not request email', () => {
        cdcLoginService.login();
        expect(cdcJsService.loginUserWithoutScreenSet).not.toHaveBeenCalled();
        expect(cdcLoginService['busy$'].value).toBe(false);
      });

      it('should not reset the form', () => {
        vi.spyOn(cdcLoginService.form, 'reset').mockImplementation(() => {});
        cdcLoginService.login();
        expect(cdcLoginService.form.reset).not.toHaveBeenCalled();
      });
    });
  });
});
