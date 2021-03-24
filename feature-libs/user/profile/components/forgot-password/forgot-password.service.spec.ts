import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthConfigService,
  GlobalMessage,
  GlobalMessageService,
  I18nTestingModule,
  OAuthFlow,
  RoutingService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { Observable, of } from 'rxjs';
import { ForgotPasswordService } from './forgot-password.service';

class MockUserPasswordService implements Partial<UserPasswordFacade> {
  requestForgotPasswordEmail(_email: string): Observable<unknown> {
    return of({});
  }
}
class MockRoutingService implements Partial<RoutingService> {
  go() {}
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getOAuthFlow() {
    return OAuthFlow.ResourceOwnerPasswordFlow;
  }
}
class MockGlobalMessageService {
  add(_message: GlobalMessage): void {}
}

describe('ForgotPasswordService', () => {
  let service: ForgotPasswordService;
  let authConfigService: AuthConfigService;
  let routingService: RoutingService;
  let userPasswordFacade: UserPasswordFacade;

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
          { provide: UserPasswordFacade, useClass: MockUserPasswordService },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: AuthConfigService, useClass: MockAuthConfigService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    service = TestBed.inject(ForgotPasswordService);
    authConfigService = TestBed.inject(AuthConfigService);
    routingService = TestBed.inject(RoutingService);
    userPasswordFacade = TestBed.inject(UserPasswordFacade);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  describe('reset', () => {
    it('should reset the form', () => {
      spyOn(service.form, 'reset').and.stub();
      service.resetForm();
      expect(service.form.reset).toHaveBeenCalled();
    });
  });

  describe('requestForgetPasswordEmail', () => {
    it('should request email for forgot password and redirect to login page', () => {
      spyOn(userPasswordFacade, 'requestForgotPasswordEmail').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();

      service.form.setValue({
        userEmail: 'test@test.com',
      });

      service.requestEmail();

      expect(
        userPasswordFacade.requestForgotPasswordEmail
      ).toHaveBeenCalledWith('test@test.com');
      expect(routingService.go).toHaveBeenCalled();
    });

    it('should not redirect when flow different than ResourceOwnerPasswordFlow is used', () => {
      spyOn(userPasswordFacade, 'requestForgotPasswordEmail').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();
      spyOn(authConfigService, 'getOAuthFlow').and.returnValue(
        OAuthFlow.ImplicitFlow
      );

      service.form.setValue({
        userEmail: 'test@test.com',
      });

      service.requestEmail();

      expect(
        userPasswordFacade.requestForgotPasswordEmail
      ).toHaveBeenCalledWith('test@test.com');
      expect(routingService.go).not.toHaveBeenCalled();
    });
  });
});
