import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ForgotPasswordComponentService } from './forgot-password-component.service';

class MockUserPasswordService implements Partial<UserPasswordFacade> {
  requestForgotPasswordEmail = vi.fn().mockReturnValue(of({}));
}
class MockRoutingService implements Partial<RoutingService> {
  go = vi.fn().mockImplementation(() => {});
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getOAuthFlow() {
    return OAuthFlow.ResourceOwnerPasswordFlow;
  }
}
class MockGlobalMessageService {
  add = vi.fn().mockImplementation(() => {});
}

describe('ForgotPasswordComponentService', () => {
  let service: ForgotPasswordComponentService;
  let authConfigService: AuthConfigService;
  let routingService: RoutingService;
  let userPasswordFacade: UserPasswordFacade;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      declarations: [],
      providers: [
        ForgotPasswordComponentService,
        { provide: UserPasswordFacade, useClass: MockUserPasswordService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AuthConfigService, useClass: MockAuthConfigService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(ForgotPasswordComponentService);
    authConfigService = TestBed.inject(AuthConfigService);
    routingService = TestBed.inject(RoutingService);
    userPasswordFacade = TestBed.inject(UserPasswordFacade);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  describe('isUpdating$', () => {
    it('should return true', () => {
      service['busy$'].next(true);
      let result;
      service.isUpdating$.subscribe((value) => (result = value)).unsubscribe();
      expect(result).toBe(true);
      expect(service.form.disabled).toBe(true);
    });

    it('should return false', () => {
      service['busy$'].next(false);
      let result;
      service.isUpdating$.subscribe((value) => (result = value)).unsubscribe();
      expect(result).toBeFalse;
      expect(service.form.disabled).toBe(false);
    });
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
        vi.spyOn(service.form, 'reset').mockImplementation(() => {});
        service.requestEmail();
        expect(service.form.reset).toHaveBeenCalled();
      });

      it('should not redirect when flow different than ResourceOwnerPasswordFlow is used', () => {
        vi.spyOn(authConfigService, 'getOAuthFlow').mockReturnValue(
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
        vi.spyOn(service.form, 'reset').mockImplementation(() => {});
        service.requestEmail();
        expect(service.form.reset).not.toHaveBeenCalled();
      });
    });
  });
});
