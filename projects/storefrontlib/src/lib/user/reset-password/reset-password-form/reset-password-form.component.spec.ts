import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { UserService, RoutingService } from '@spartacus/core';

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
    queryParams: { token: 'test token' }
  }
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

  let userService: MockUserService;
  let routingService: MockRoutingService;

  let form: DebugElement;
  let password: AbstractControl;
  let rePassword: AbstractControl;

  const validPassword = 'test1234Test@';
  const nonValidPassword = '12341234';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ResetPasswordFormComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.componentInstance;

    form = fixture.debugElement.query(By.css('form'));
    password = component.form.controls['password'];
    rePassword = component.form.controls['repassword'];

    userService = TestBed.get(UserService);
    routingService = TestBed.get(RoutingService);
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
    rePassword.setValue(nonValidPassword);
    expect(component.form.valid).toBeFalsy();
  });

  it('should form be invalid when password and repassword are not match', () => {
    password.setValue(validPassword);
    rePassword.setValue(nonValidPassword);
    expect(component.form.valid).toBeFalsy();
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
    expect(routingService.go).toHaveBeenCalledWith({ route: ['login'] });
  });
});
