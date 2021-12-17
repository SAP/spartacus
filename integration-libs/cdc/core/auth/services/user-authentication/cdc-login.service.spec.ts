import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
    AuthService,
    GlobalMessageService,
    I18nTestingModule,
    WindowRef
} from '@spartacus/core';
import { LoginFormComponentService } from 'feature-libs/user/account/components/login-form/login-form-component.service';
import { CdcJsService } from 'integration-libs/cdc/root';
import { FormErrorsModule } from 'projects/storefrontlib/shared';
import { of } from 'rxjs';
import { CdcLoginComponentService } from './cdc-login.service';
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

class MockCDCJsServiceWithCDC implements Partial<CdcJsService> {
  didLoad = createSpy().and.returnValue(of(true));
  registerUserWithoutScreenSet = createSpy().and.callFake((user) => of(user));
}

class MockCDCJsServiceWithoutCDC implements Partial<CdcJsService> {
  didLoad = createSpy().and.returnValue(of(false));
}

describe('CdcLoginComponentService', () => {
  let cdcLoginService: CdcLoginComponentService;
  let loginFormService: LoginFormComponentService;
  let cdcJsService: CdcJsService;
  let winRef: WindowRef;

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
          CdcLoginComponentService,
          { provide: WindowRef, useClass: MockWinRef },
          { provide: AuthService, useClass: MockAuthService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          { provide: CdcJsService, useClass: MockCDCJsServiceWithCDC },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    cdcLoginService = TestBed.inject(CdcLoginComponentService);
    cdcJsService = TestBed.inject(CdcJsService);
    winRef = TestBed.inject(WindowRef);
  });

  it('should create service', () => {
    expect(cdcLoginService).toBeTruthy();
  });

  describe('login', () => {
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

      it('should happen without CDC', () => {
        TestBed.overrideProvider(CdcJsService, {
          useValue: MockCDCJsServiceWithoutCDC,
        });
        spyOnProperty(winRef, 'nativeWindow', 'get').and.returnValue({
          history: { state: { newUid: 'test.user@shop.com' } },
        });
        expect(loginFormService.login).toBeCalled();
      });
    });
  });
});
