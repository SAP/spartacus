import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthConfigService,
  GlobalMessageService,
  I18nTestingModule,
  OAuthFlow,
  RoutingService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { ForgotPasswordComponent } from './forgot-password.component';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

class MockUserPasswordFacade implements Partial<UserPasswordFacade> {
  requestForgotPasswordEmail = createSpy().and.returnValue(of(undefined));
}
class MockRoutingService implements Partial<RoutingService> {
  go = createSpy();
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getOAuthFlow() {
    return OAuthFlow.ResourceOwnerPasswordFlow;
  }
}
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let form: DebugElement;
  let userEmail: AbstractControl;
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
        declarations: [ForgotPasswordComponent, MockUrlPipe],
        providers: [
          { provide: UserPasswordFacade, useClass: MockUserPasswordFacade },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: AuthConfigService, useClass: MockAuthConfigService },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    authConfigService = TestBed.inject(AuthConfigService);
    routingService = TestBed.inject(RoutingService);
    userPasswordFacade = TestBed.inject(UserPasswordFacade);
    component = fixture.componentInstance;
    form = fixture.debugElement.query(By.css('form'));

    component.ngOnInit();
    userEmail = component.forgotPasswordForm.controls['userEmail'];
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call requestForgotPasswordEmail() method on submit', () => {
    const request = spyOn(component, 'requestForgotPasswordEmail');
    userEmail.setValue('test@test.com');
    fixture.detectChanges();

    form.triggerEventHandler('submit', null);
    expect(request).toHaveBeenCalled();
  });

  describe('requestForgetPasswordEmail', () => {
    it('should request email for forgot password and redirect to login page', () => {
      component.forgotPasswordForm.setValue({
        userEmail: 'test@test.com',
      });

      component.requestForgotPasswordEmail();

      expect(
        userPasswordFacade.requestForgotPasswordEmail
      ).toHaveBeenCalledWith('test@test.com');
      expect(routingService.go).toHaveBeenCalled();
    });

    it('should not redirect when flow different than ResourceOwnerPasswordFlow is used', () => {
      spyOn(authConfigService, 'getOAuthFlow').and.returnValue(
        OAuthFlow.ImplicitFlow
      );

      component.forgotPasswordForm.setValue({
        userEmail: 'test@test.com',
      });

      component.requestForgotPasswordEmail();

      expect(
        userPasswordFacade.requestForgotPasswordEmail
      ).toHaveBeenCalledWith('test@test.com');
      expect(routingService.go).not.toHaveBeenCalled();
    });
  });
});
