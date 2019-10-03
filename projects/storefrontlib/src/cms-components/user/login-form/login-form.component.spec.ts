import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
import { CheckoutConfigService } from '../../checkout';
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

class MockActivatedRoute {
  snapshot = {
    queryParams: {
      forced: false,
    },
  };
}

class MockCheckoutConfigService {
  isGuestCheckout() {
    return false;
  }
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let authService: MockAuthService;
  let authRedirectService: AuthRedirectService;
  let windowRef: WindowRef;

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
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
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
    windowRef = TestBed.get(WindowRef as Type<WindowRef>);
  });

  beforeEach(() => {
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
    windowRef.nativeWindow.history.pushState(
      {
        newUid: email,
      },
      null
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.controls['userId'].value).toBe(email);

    // reset the state
    windowRef.nativeWindow.history.replaceState(null, null);
  });

  describe('login()', () => {
    it('should login and redirect to return url after auth', () => {
      const email = 'test@email.com';
      const password = 'secret';

      component.form.controls['userId'].setValue(email);
      component.form.controls['password'].setValue(password);
      component.login();

      expect(authService.authorize).toHaveBeenCalledWith(email, password);
      expect(authRedirectService.redirect).toHaveBeenCalled();
    });

    it('should handle changing email to lowercase', () => {
      const email_uppercase = 'TEST@email.com';
      const email_lowercase = 'test@email.com';
      const password = 'secret';

      component.form.controls['userId'].setValue(email_uppercase);
      component.form.controls['password'].setValue(password);
      component.login();

      expect(authService.authorize).toHaveBeenCalledWith(
        email_lowercase,
        password
      );
    });
  });

  describe('userId form field', () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.form.controls['userId'];
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

  describe('guest checkout', () => {
    it('should show "Register" when forced flag is false', () => {
      const registerLinkElement: HTMLElement = fixture.debugElement.query(
        By.css('.btn-register')
      ).nativeElement;
      const guestLink = fixture.debugElement.query(By.css('.btn-guest'));

      expect(guestLink).toBeFalsy();
      expect(registerLinkElement).toBeTruthy();
    });

    it('should show "Guest checkout" when forced flag is true', () => {
      component.loginAsGuest = true;
      fixture.detectChanges();

      const guestLinkElement: HTMLElement = fixture.debugElement.query(
        By.css('.btn-guest')
      ).nativeElement;
      const registerLink = fixture.debugElement.query(By.css('.btn-register'));

      expect(registerLink).toBeFalsy();
      expect(guestLinkElement).toBeTruthy();
    });
  });
});
