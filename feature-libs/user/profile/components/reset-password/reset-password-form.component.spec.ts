import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserPasswordService } from '@spartacus/user/profile/core';
import { of } from 'rxjs';
import { ResetPasswordFormComponent } from './reset-password-form.component';

class MockUserPasswordService {
  reset() {}
  isPasswordReset() {
    return of();
  }
}

const router = {
  state: {
    url: '/test',
    queryParams: { token: 'test token' },
  },
};
class MockRoutingService {
  getRouterState() {
    return of(router);
  }
  go() {}
}

describe('ResetPasswordFormComponent', () => {
  let component: ResetPasswordFormComponent;
  let fixture: ComponentFixture<ResetPasswordFormComponent>;

  let userPasswordService: UserPasswordService;
  let routingService: RoutingService;

  let form: DebugElement;
  let password: AbstractControl;
  let rePassword: AbstractControl;

  const validPassword = 'test1234Test@';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FormErrorsModule,
        ],
        declarations: [ResetPasswordFormComponent],
        providers: [
          { provide: UserPasswordService, useClass: MockUserPasswordService },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.componentInstance;

    form = fixture.debugElement.query(By.css('form'));
    password = component.resetPasswordForm.controls['password'];
    rePassword = component.resetPasswordForm.controls['repassword'];

    userPasswordService = TestBed.inject(UserPasswordService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form property', () => {
    expect(component.resetPasswordForm.controls['repassword'].value).toBe('');
    expect(component.resetPasswordForm.controls['password'].value).toBe('');
  });

  it('should form be valid when password and repassword are set correctly', () => {
    password.setValue(validPassword);
    rePassword.setValue(validPassword);
    expect(component.resetPasswordForm.valid).toBeTruthy();
  });

  it('should call resetPassword() method on submit', () => {
    const request = spyOn(component, 'resetPassword');
    password.setValue(validPassword);
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);
    expect(request).toHaveBeenCalled();
  });

  it('should resetPassword on submit when form is valid', () => {
    spyOn(userPasswordService, 'reset');

    password.setValue(validPassword);
    rePassword.setValue(validPassword);
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);

    expect(userPasswordService.reset).toHaveBeenCalledWith(
      'test token',
      validPassword
    );
  });

  it('should go to login page when password reset successfully', () => {
    spyOn(routingService, 'go').and.stub();
    spyOn(userPasswordService, 'isPasswordReset').and.returnValue(of(true));
    component.ngOnInit();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
  });
});
