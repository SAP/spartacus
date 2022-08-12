import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  WindowRef,
} from '@spartacus/core';
import { LoginFormComponentService } from 'feature-libs/user/account/components/login-form/login-form-component.service';
import { CdcJsService } from 'integration-libs/cdc/root';
import { FormErrorsModule } from 'projects/storefrontlib/shared';
import { of } from 'rxjs';
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
  registerUserWithoutScreenSet = createSpy().and.callFake((user: any) =>
    of(user)
  );
  loginUserWithoutScreenSet = createSpy();
}

class MockLoginFormComponentService
  implements Partial<LoginFormComponentService>
{
  login = createSpy();
}

describe('CdcLoginComponentService', () => {
  let cdcLoginService: CdcLoginFormComponentService;
  // let loginFormService: LoginFormComponentService;
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
        password,
        true
      );
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
    });
  });
});
