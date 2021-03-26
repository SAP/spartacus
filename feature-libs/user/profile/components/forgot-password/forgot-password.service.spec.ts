import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthConfigService,
  GlobalMessageService,
  I18nTestingModule,
  OAuthFlow,
  RoutingService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { ForgotPasswordService } from './forgot-password.service';
import createSpy = jasmine.createSpy;

class MockUserPasswordService implements Partial<UserPasswordFacade> {
  requestForgotPasswordEmail = createSpy().and.returnValue(of({}));
}
class MockRoutingService implements Partial<RoutingService> {
  go = createSpy().and.stub();
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getOAuthFlow() {
    return OAuthFlow.ResourceOwnerPasswordFlow;
  }
}
class MockGlobalMessageService {
  add = createSpy().and.stub();
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
          ForgotPasswordService,
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

  describe('requestEmail', () => {
    describe('success', () => {
      beforeEach(() => {
        service.form.setValue({
          userEmail: 'test@test.com',
        });
      });

      it('should request email', () => {
        service.requestEmail();
        expect(
          userPasswordFacade.requestForgotPasswordEmail
        ).toHaveBeenCalledWith('test@test.com');
      });

      it('should route the user to login', () => {
        service.requestEmail();
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      });

      it('should reset the form', () => {
        spyOn(service.form, 'reset').and.stub();
        service.requestEmail();
        expect(service.form.reset).toHaveBeenCalled();
      });

      it('should not redirect when flow different than ResourceOwnerPasswordFlow is used', () => {
        spyOn(authConfigService, 'getOAuthFlow').and.returnValue(
          OAuthFlow.ImplicitFlow
        );
        service.requestEmail();
        expect(routingService.go).not.toHaveBeenCalled();
      });
    });

    describe('error', () => {
      beforeEach(() => {
        service.form.setValue({
          userEmail: 'invalid.email',
        });
      });

      it('should not request email', () => {
        service.requestEmail();
        expect(
          userPasswordFacade.requestForgotPasswordEmail
        ).not.toHaveBeenCalled();
      });

      it('should not route the user', () => {
        service.requestEmail();
        expect(routingService.go).not.toHaveBeenCalled();
      });

      it('should not reset the form', () => {
        spyOn(service.form, 'reset').and.stub();
        service.requestEmail();
        expect(service.form.reset).not.toHaveBeenCalled();
      });
    });
  });
});
