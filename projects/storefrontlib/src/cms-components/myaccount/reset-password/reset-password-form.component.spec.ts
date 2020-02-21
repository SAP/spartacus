import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { ResetPasswordFormComponent } from './reset-password-form.component';

class MockUserService {
  isPasswordReset() {
    return of();
  }
  resetPassword() {}
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

  let userService: UserService;
  let routingService: RoutingService;

  let form: DebugElement;
  let password: AbstractControl;
  let rePassword: AbstractControl;

  const validPassword = 'test1234Test@';
  const nonValidPassword = '1234';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, I18nTestingModule],
      declarations: [ResetPasswordFormComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.componentInstance;

    form = fixture.debugElement.query(By.css('form'));
    password = component.form.controls['password'];
    rePassword = component.form.controls['repassword'];

    userService = TestBed.inject(UserService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form property', () => {
    expect(component.form.controls['repassword'].value).toBe('');
    expect(component.form.controls['password'].value).toBe('');
  });

  it('should form be valid when password and repassword are set correctly', () => {
    password.setValue(validPassword);
    rePassword.setValue(validPassword);
    expect(component.form.valid).toBeTruthy();
  });

  it('should form be invalid when password not valid', () => {
    password.setValue(nonValidPassword);
    password.markAsDirty();
    password.markAsTouched();
    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy();
    const message = fixture.debugElement.query(By.css('.invalid-feedback'))
      .children[0].nativeElement.textContent;
    expect(message).toEqual('register.passwordMinRequirements');
  });

  it('should form be invalid when password and repassword are not match', () => {
    password.setValue(validPassword);
    rePassword.setValue(nonValidPassword);
    rePassword.markAsDirty();
    rePassword.markAsTouched();
    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy();
    const message = fixture.debugElement.query(By.css('.invalid-feedback'))
      .children[0].nativeElement.textContent;
    expect(message).toEqual('register.bothPasswordMustMatch');
  });

  it('should call resetPassword() method on submit', () => {
    const request = spyOn(component, 'resetPassword');
    password.setValue(validPassword);
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);
    expect(request).toHaveBeenCalled();
  });

  it('should resetPassword on submit when form is valide', () => {
    spyOn(userService, 'resetPassword');

    password.setValue(validPassword);
    rePassword.setValue(validPassword);
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);

    expect(userService.resetPassword).toHaveBeenCalledWith(
      'test token',
      validPassword
    );
    expect(component.submited).toBeTruthy();
  });

  it('should go to login page when password reset successfully', () => {
    spyOn(routingService, 'go').and.stub();
    spyOn(userService, 'isPasswordReset').and.returnValue(of(true));
    component.ngOnInit();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
  });
});
