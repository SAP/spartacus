import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthConfigService,
  AuthService,
  FeatureConfigService,
  GlobalMessageService,
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

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled(_feature: string): boolean {
    return false;
  }
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getCustomLoginFormEndpoint() {
    return 'https://localhost:9002/authorizationserver/login';
  }
}

describe('LoginFormComponentService', () => {
  let service: LoginFormComponentService;
  let authService: AuthService;
  let winRef: WindowRef;
  // let featureConfigService: FeatureConfigService;
  // let auth: AuthConfigService;
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(LoginFormComponentService);
    authService = TestBed.inject(AuthService);
    winRef = TestBed.inject(WindowRef);
    // featureConfigService = TestBed.inject(FeatureConfigService);
    // auth = TestBed.inject(AuthConfigService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
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
        // spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
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

    describe('error', () => {
      // spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
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
  });
});
