import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { of, throwError } from 'rxjs';
import { ResetPasswordFormComponent } from './reset-password-form.component';
import createSpy = jasmine.createSpy;

class MockUserPasswordFacade implements Partial<UserPasswordFacade> {
  reset = createSpy().and.returnValue(of(undefined));
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
  go = createSpy();
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

describe('ResetPasswordFormComponent', () => {
  let component: ResetPasswordFormComponent;
  let fixture: ComponentFixture<ResetPasswordFormComponent>;

  let userPasswordFacade: UserPasswordFacade;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

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
          { provide: UserPasswordFacade, useClass: MockUserPasswordFacade },
          { provide: RoutingService, useClass: MockRoutingService },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
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

    userPasswordFacade = TestBed.inject(UserPasswordFacade);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
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
    password.setValue(validPassword);
    rePassword.setValue(validPassword);
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);

    expect(userPasswordFacade.reset).toHaveBeenCalledWith(
      'test token',
      validPassword
    );
  });

  it('should go to login page when password reset successfully', () => {
    component.ngOnInit();
    password.setValue(validPassword);
    rePassword.setValue(validPassword);
    component.resetPassword();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
  });

  it('should show error message when password reset fails', () => {
    (<jasmine.Spy>userPasswordFacade.reset).and.returnValue(
      throwError({
        details: [{ message: 'Could not reset' }],
      })
    );

    component.ngOnInit();
    password.setValue(validPassword);
    rePassword.setValue(validPassword);
    component.resetPassword();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { raw: 'Could not reset' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should not show error message when password reset fails without error details', () => {
    (<jasmine.Spy>userPasswordFacade.reset).and.returnValue(
      throwError(new Error('Unknown error'))
    );

    component.ngOnInit();
    password.setValue(validPassword);
    rePassword.setValue(validPassword);
    component.resetPassword();
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });
});
