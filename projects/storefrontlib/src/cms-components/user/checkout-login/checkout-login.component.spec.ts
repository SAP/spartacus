import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  AuthRedirectService,
  CartService,
  I18nTestingModule,
  User,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CheckoutLoginComponent } from './checkout-login.component';

import createSpy = jasmine.createSpy;

class MockCartService {
  addEmail = createSpy('MockCartService.addEmail');
  getAssignedUser() {
    return of();
  }
  isGuestCart(): Boolean {
    return false;
  }
}
class MockRedirectAfterAuthService {
  redirect = createSpy('AuthRedirectService.redirect');
}

const testEmail = 'john@acme.com';

describe('CheckoutLoginComponent', () => {
  let component: CheckoutLoginComponent;
  let fixture: ComponentFixture<CheckoutLoginComponent>;
  let cartService: CartService;
  let authRedirectService: AuthRedirectService;
  let el: DebugElement;

  let controls: { [key: string]: AbstractControl };
  let email: AbstractControl;
  let emailConfirmation: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [CheckoutLoginComponent],
      providers: [
        { provide: CartService, useClass: MockCartService },
        {
          provide: AuthRedirectService,
          useClass: MockRedirectAfterAuthService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutLoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    controls = component.form.controls;
    email = controls['email'];
    emailConfirmation = controls['emailConfirmation'];

    cartService = TestBed.get(CartService);
    authRedirectService = TestBed.get(AuthRedirectService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(email.value).toBe('');
    expect(emailConfirmation.value).toBe('');
  });

  describe('Error messages without submit', () => {
    it('should display error message when emails are not the same', () => {
      email.setValue('a@b.com');
      email.markAsTouched();
      email.markAsDirty();
      emailConfirmation.setValue('a@bc.com');
      emailConfirmation.markAsTouched();
      emailConfirmation.markAsDirty();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.form.valid).toBeFalsy();
        expect(isFormControlDisplayingError('emailConfirmation')).toBeTruthy();
      });
    });

    it('should not display error message when emails are the same', () => {
      email.setValue(testEmail);
      emailConfirmation.setValue(testEmail);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.form.valid).toBeTruthy();
        expect(isFormControlDisplayingError('emailConfirmation')).toBeFalsy();
      });
    });
  });

  describe('on submit', () => {
    it('should submit when form is populated correctly', () => {
      spyOn(cartService, 'getAssignedUser').and.returnValue(
        of({ name: 'guest', uid: 'john@acme.com' } as User)
      );
      spyOn(cartService, 'isGuestCart').and.returnValue(true);

      email.setValue(testEmail);
      emailConfirmation.setValue(testEmail);

      fixture.detectChanges();

      component.onSubmit();

      fixture.whenStable().then(() => {
        expect(component.form.valid).toBeTruthy();
        expect(isFormControlDisplayingError('email')).toBeFalsy();
        expect(isFormControlDisplayingError('emailConfirmation')).toBeFalsy();

        expect(cartService.addEmail).toHaveBeenCalledWith(testEmail);
        expect(authRedirectService.redirect).toHaveBeenCalled();
      });
    });

    it('should not submit when form is populated incorrectly', () => {
      email.setValue('xxxx');
      expect(isFormControlDisplayingError('email')).toBeFalsy();
      expect(isFormControlDisplayingError('emailConfirmation')).toBeFalsy();

      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));

      fixture.detectChanges();

      expect(component.form.valid).toBeFalsy();
      expect(isFormControlDisplayingError('email')).toBeTruthy();
      expect(isFormControlDisplayingError('emailConfirmation')).toBeTruthy();
      expect(authRedirectService.redirect).not.toHaveBeenCalled();
    });

    it('should show warning when emails do not match', () => {
      email.setValue(testEmail);
      emailConfirmation.setValue('xxxx');

      expect(isFormControlDisplayingError('email')).toBeFalsy();
      expect(isFormControlDisplayingError('emailConfirmation')).toBeFalsy();

      const submitBtn = el.query(By.css('button[type="submit"]'));
      submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));

      fixture.detectChanges();

      expect(component.form.valid).toBeFalsy();
      expect(isFormControlDisplayingError('email')).toBeFalsy();
      expect(isFormControlDisplayingError('emailConfirmation')).toBeTruthy();
    });
  });

  function isFormControlDisplayingError(formControlName: string): boolean {
    const elementWithErrorMessage = el.query(
      By.css(
        `input[formcontrolname="${formControlName}"] + div.invalid-feedback`
      )
    );

    if (!elementWithErrorMessage) {
      return false;
    }

    const errorMessage: string =
      elementWithErrorMessage.nativeElement.innerText;

    return errorMessage && errorMessage.trim().length > 0;
  }
});
