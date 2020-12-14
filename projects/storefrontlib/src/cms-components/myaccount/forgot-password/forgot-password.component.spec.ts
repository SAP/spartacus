import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthConfigService,
  I18nTestingModule,
  OAuthFlow,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { FormErrorsModule } from '../../../shared/index';
import { ForgotPasswordComponent } from './forgot-password.component';

class MockUserService implements Partial<UserService> {
  requestForgotPasswordEmail() {}
}
class MockRoutingService implements Partial<RoutingService> {
  go() {}
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

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let form: DebugElement;
  let userEmail: AbstractControl;
  let authConfigService: AuthConfigService;
  let routingService: RoutingService;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        I18nTestingModule,
        FormErrorsModule,
      ],
      declarations: [ForgotPasswordComponent, MockUrlPipe],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AuthConfigService, useClass: MockAuthConfigService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    authConfigService = TestBed.inject(AuthConfigService);
    routingService = TestBed.inject(RoutingService);
    userService = TestBed.inject(UserService);
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
      spyOn(userService, 'requestForgotPasswordEmail').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();

      component.forgotPasswordForm.setValue({
        userEmail: 'test@test.com',
      });

      component.requestForgotPasswordEmail();

      expect(userService.requestForgotPasswordEmail).toHaveBeenCalledWith(
        'test@test.com'
      );
      expect(routingService.go).toHaveBeenCalled();
    });

    it('should not redirect when flow different than ResourceOwnerPasswordFlow is used', () => {
      spyOn(userService, 'requestForgotPasswordEmail').and.callThrough();
      spyOn(routingService, 'go').and.callThrough();
      spyOn(authConfigService, 'getOAuthFlow').and.returnValue(
        OAuthFlow.ImplicitFlow
      );

      component.forgotPasswordForm.setValue({
        userEmail: 'test@test.com',
      });

      component.requestForgotPasswordEmail();

      expect(userService.requestForgotPasswordEmail).toHaveBeenCalledWith(
        'test@test.com'
      );
      expect(routingService.go).not.toHaveBeenCalled();
    });
  });
});
