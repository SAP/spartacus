import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthConfigService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OAuthFlow,
  RoutingService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { of, throwError } from 'rxjs';
import { CDCForgotPasswordComponentService } from './cdc-forgot-password-component.service';
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
  remove = createSpy().and.stub();
}

class MockCDCJsService implements Partial<CdcJsService> {
  didLoad = createSpy().and.returnValue(of(false));
  registerUserWithoutScreenSet = createSpy().and.callFake(() =>
    of({ status: 'OK' })
  );
  onLoginEventHandler = createSpy();
  resetPasswordWithoutScreenSet = createSpy().and.callFake(() =>
    of({ status: 'OK' })
  );
}

describe('CDCForgotPasswordComponentService', () => {
  let service: CDCForgotPasswordComponentService;
  let authConfigService: AuthConfigService;
  let routingService: RoutingService;
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
          CDCForgotPasswordComponentService,
          { provide: UserPasswordFacade, useClass: MockUserPasswordService },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: CdcJsService, useClass: MockCDCJsService },
          { provide: AuthConfigService, useClass: MockAuthConfigService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ],
      });
    })
  );

  beforeEach(() => {
    service = TestBed.inject(CDCForgotPasswordComponentService);
    authConfigService = TestBed.inject(AuthConfigService);
    routingService = TestBed.inject(RoutingService);
    cdcJsService = TestBed.inject(CdcJsService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    TestBed.compileComponents();
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

      it('should request email through CDC SDK', () => {
        cdcJsService.didLoad = createSpy().and.returnValue(of(true));
        service.requestEmail();
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
        expect(cdcJsService.resetPasswordWithoutScreenSet).toHaveBeenCalledWith(
          'test@test.com'
        );
        expect(service['busy$'].value).toBe(false);
      });

      it('should handle a failed email request through CDC SDK', () => {
        cdcJsService.didLoad = createSpy().and.returnValue(of(true));
        (
          cdcJsService.resetPasswordWithoutScreenSet as jasmine.Spy
        ).and.returnValue(
          throwError(() => 'test error: such email does not exist!')
        );
        service.requestEmail();
        expect(routingService.go).not.toHaveBeenCalled();
        expect(service['busy$'].value).toBe(false);
      });

      it('should show error and should not redirect if CDC SDK did not load', () => {
        cdcJsService.didLoad = createSpy().and.returnValue(of(false));
        service.requestEmail();
        expect(routingService.go).not.toHaveBeenCalled();
        expect(
          cdcJsService.resetPasswordWithoutScreenSet
        ).not.toHaveBeenCalled();
        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'errorHandlers.scriptFailedToLoad',
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
        expect(service['busy$'].value).toBe(false);
      });

      it('should route the user to login', () => {
        cdcJsService.didLoad = createSpy().and.returnValue(of(true));
        service.requestEmail();
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      });

      it('should not redirect when flow different than ResourceOwnerPasswordFlow is used', () => {
        spyOn(authConfigService, 'getOAuthFlow').and.returnValue(
          OAuthFlow.ImplicitFlow
        );
        service.requestEmail();
        expect(routingService.go).not.toHaveBeenCalled();
      });
    });

    describe('when email is invalid', () => {
      beforeEach(() => {
        service.form.setValue({
          userEmail: 'invalid.email',
        });
      });

      it('should not request email', () => {
        service.requestEmail();
        expect(
          cdcJsService.resetPasswordWithoutScreenSet
        ).not.toHaveBeenCalled();
        expect(service['busy$'].value).toBe(false);
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
