import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  I18nTestingModule,
  UserToken,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LoginFormComponent } from './login-form.component';

import createSpy = jasmine.createSpy;

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockAuthService {
  authorize = createSpy();
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
  }
}

class MockRedirectAfterAuthService {
  redirect = createSpy('AuthRedirectService.redirect');
}
class MockGlobalMessageService {
  remove = createSpy();
}

// const MockWindowRef = {
//   nativeWindow: {
//     history: {
//       state: {},
//     },
//   },
// };

fdescribe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let authService: MockAuthService;
  let authRedirectService: AuthRedirectService;
  let mockWindowRef: WindowRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, I18nTestingModule],
      declarations: [LoginFormComponent, MockUrlPipe],
      providers: [
        WindowRef,
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: AuthRedirectService,
          useClass: MockRedirectAfterAuthService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService as Type<AuthService>);
    authRedirectService = TestBed.get(AuthRedirectService as Type<
      AuthRedirectService
    >);
    mockWindowRef = TestBed.get(WindowRef as Type<WindowRef>);
  });

  beforeEach(() => {
    mockWindowRef.nativeWindow.history.pushState(null, null);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form - empty', () => {
    expect(component.form.controls['userId'].value).toBe('');
    expect(component.form.controls['password'].value).toBe('');
  });

  it('should init the form - prefilled', () => {
    const email = 'test@email.com';
    mockWindowRef.nativeWindow.history.pushState(
      {
        newUid: email,
      },
      null
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.controls['userId'].value).toBe(email);
    mockWindowRef.nativeWindow.history.pushState(null, null);
  });

  it('should login and redirect to return url after auth', () => {
    const username = 'test@email.com';
    const password = 'secret';

    component.form.controls['userId'].setValue(username);
    component.form.controls['password'].setValue(password);
    component.login();

    expect(authService.authorize).toHaveBeenCalledWith(username, password);
    expect(authRedirectService.redirect).toHaveBeenCalled();
  });

  describe('userId form field', () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.form.controls['userId'];
    });

    it('should make email lowercase', () => {
      const upperCaseEmail = 'Test@email.com';
      const lowerCaseEmail = upperCaseEmail.toLowerCase();

      control.setValue(upperCaseEmail);
      const result = component.emailToLowerCase();
      expect(result).toEqual(lowerCaseEmail);
    });

    it('original form email value should NOT be changed', () => {
      const upperCaseEmail = 'Test@email.com';

      control.setValue(upperCaseEmail);
      component.emailToLowerCase();
      expect(control.value).toEqual(upperCaseEmail);
    });

    it('should NOT be valid when empty', () => {
      control.setValue('');
      expect(control.valid).toBeFalsy();
    });

    it('should NOT be valid when is an invalid email', () => {
      control.setValue('with space@email.com');
      expect(control.valid).toBeFalsy();

      control.setValue('without.domain@');
      expect(control.valid).toBeFalsy();

      control.setValue('without.at.com');
      expect(control.valid).toBeFalsy();

      control.setValue('@without.username.com');
      expect(control.valid).toBeFalsy();
    });

    it('should be valid when is a valid email', () => {
      control.setValue('valid@email.com');
      expect(control.valid).toBeTruthy();

      control.setValue('valid123@example.email.com');
      expect(control.valid).toBeTruthy();
    });
  });

  describe('password form field', () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.form.controls['password'];
    });

    it('should be valid when not empty', () => {
      control.setValue('not-empty');
      expect(control.valid).toBeTruthy();

      control.setValue('not empty');
      expect(control.valid).toBeTruthy();

      control.setValue(' ');
      expect(control.valid).toBeTruthy();
    });

    it('should NOT be valid when empty', () => {
      control.setValue('');
      expect(control.valid).toBeFalsy();

      control.setValue(null);
      expect(control.valid).toBeFalsy();
    });
  });
});
