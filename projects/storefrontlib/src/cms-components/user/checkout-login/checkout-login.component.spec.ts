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
    ['email', 'emailConfirmation'].forEach(field => {
      describe(`${field} form field inline validation`, () => {
        let control: AbstractControl;

        beforeEach(() => {
          control = controls[field];
        });

        it('should not be valid when empty', () => {
          control.setValue('');
          expect(control.valid).toBeFalsy();
        });

        it('should be invalid with an invalid email', () => {
          control.setValue('with space@email.com');
          expect(control.valid).toBeFalsy();

          control.setValue('without.domain@');
          expect(control.valid).toBeFalsy();

          control.setValue('without.at.com');
          expect(control.valid).toBeFalsy();

          control.setValue('@without.username.com');
          expect(control.valid).toBeFalsy();
        });

        it('should be valid with a valid email', () => {
          control.setValue('valid@email.com');
          expect(control.valid).toBeTruthy();

          control.setValue('valid123@example.email.com');
          expect(control.valid).toBeTruthy();
        });
      });

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
          expect(
            isFormControlDisplayingError('emailConfirmation')
          ).toBeTruthy();
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
      spyOn(cartService, 'getAssignedUser').and.returnValue(
        of({ name: 'anonymous', uid: 'anonymous' } as User)
      );
      spyOn(cartService, 'isGuestCart').and.returnValue(false);

      component.onSubmit();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.form.valid).toBeFalsy();
        expect(isFormControlDisplayingError('email')).toBeTruthy();
        expect(isFormControlDisplayingError('emailConfirmation')).toBeTruthy();
        expect(authRedirectService.redirect).not.toHaveBeenCalled();
      });
    });
  });

  function isFormControlDisplayingError(formControlName: string): boolean {
    const elementWithErrorMessage = fixture.debugElement.query(
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
