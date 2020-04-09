import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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

  let authService: AuthService;
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
    authService = TestBed.inject(AuthService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    windowRef = TestBed.inject(WindowRef);
  });

  beforeEach(() => {
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form - empty', () => {
    expect(component.loginForm.controls['userId'].value).toBe('');
    expect(component.loginForm.controls['password'].value).toBe('');
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

    expect(component.loginForm.controls['userId'].value).toBe(email);

    // reset the state
    windowRef.nativeWindow.history.replaceState(null, null);
  });

  describe('login()', () => {
    it('should login and redirect to return url after auth', () => {
      const email = 'test@email.com';
      const password = 'secret';

      component.loginForm.controls['userId'].setValue(email);
      component.loginForm.controls['password'].setValue(password);
      component.submitForm();

      expect(authService.authorize).toHaveBeenCalledWith(email, password);
      expect(authRedirectService.redirect).toHaveBeenCalled();
    });

    it('should not login when form not valid', () => {
      const email = 'test@email.com';

      component.loginForm.controls['userId'].setValue(email);
      component.submitForm();

      expect(authService.authorize).not.toHaveBeenCalled();
      expect(authRedirectService.redirect).not.toHaveBeenCalled();
    });

    it('should handle changing email to lowercase', () => {
      const email_uppercase = 'TEST@email.com';
      const email_lowercase = 'test@email.com';
      const password = 'secret';

      component.loginForm.controls['userId'].setValue(email_uppercase);
      component.loginForm.controls['password'].setValue(password);
      component.submitForm();

      expect(authService.authorize).toHaveBeenCalledWith(
        email_lowercase,
        password
      );
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
