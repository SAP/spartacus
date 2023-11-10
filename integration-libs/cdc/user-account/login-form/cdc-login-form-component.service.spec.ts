import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  WindowRef,
} from '@spartacus/core';
import { LoginFormComponentService } from '@spartacus/user/account/components';
import { FormErrorsModule } from 'projects/storefrontlib/shared';
import { of, throwError } from 'rxjs';
import { CdcLoginFormComponentService } from './cdc-login-form-component.service';
import createSpy = jasmine.createSpy;

class MockWinRef {
  get nativeWindow(): Window {
    return {} as Window;
  }
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(of({}));
  isUserLoggedIn = createSpy().and.returnValue(of(true));
}

class MockGlobalMessageService {
  add = createSpy().and.stub();
  remove = createSpy().and.stub();
}

class MockCDCJsService implements Partial<CdcJsService> {
  didLoad = createSpy().and.returnValues(of(true), of(false));
  registerUserWithoutScreenSet = createSpy().and.callFake(() =>
    of({ status: 'OK' })
  );
  loginUserWithoutScreenSet = createSpy().and.returnValues(of(true));
}

class MockLoginFormComponentService
  implements Partial<LoginFormComponentService>
{
  login = createSpy();
}

describe('CdcLoginComponentService', () => {
  let cdcLoginService: CdcLoginFormComponentService;
  let cdcJsService: CdcJsService;
  let globalMessageService: GlobalMessageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FormErrorsModule,
        ],
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
        ],
      });
    })
  );

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
      cdcJsService.didLoad = createSpy().and.returnValue(of(true));
      (cdcJsService.loginUserWithoutScreenSet as jasmine.Spy).and.returnValue(
        throwError('test error: such email does not exist!')
      );
      cdcLoginService.login();
      expect(cdcLoginService['busy$'].value).toBe(false);
    });

    it('should NOT happen without CDC, should show error', () => {
      cdcLoginService.form.setValue({
        userId: userId,
        password: password,
      });
      cdcJsService.didLoad = createSpy().and.returnValue(of(false));
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
        spyOn(cdcLoginService.form, 'reset').and.stub();
        cdcLoginService.login();
        expect(cdcLoginService.form.reset).not.toHaveBeenCalled();
      });
    });
  });
});
