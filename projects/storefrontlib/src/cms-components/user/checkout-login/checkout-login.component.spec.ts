import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { CheckoutLoginComponent } from './checkout-login.component';

describe('CheckoutLoginComponent', () => {
  let component: CheckoutLoginComponent;
  let fixture: ComponentFixture<CheckoutLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [CheckoutLoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    const controls = component.form.controls;
    expect(controls['email'].value).toBe('');
    expect(controls['emailConfirmation'].value).toBe('');
    expect(controls['termsAndConditions'].value).toBe('');
  });

  describe('Error messages without submit', () => {
    ['email', 'emailConfirmation'].forEach(field => {
      describe(`${field} form field inline validation`, () => {
        let control: AbstractControl;

        beforeEach(() => {
          control = component.form.controls[field];
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
        const controls = component.form.controls;
        controls['email'].setValue('a@b.com');
        controls['email'].markAsTouched();
        controls['email'].markAsDirty();
        controls['emailConfirmation'].setValue('a@bc.com');
        controls['emailConfirmation'].markAsTouched();
        controls['emailConfirmation'].markAsDirty();

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(component.form.valid).toBeFalsy();
          expect(
            isFormControlDisplayingError('emailConfirmation')
          ).toBeTruthy();
        });
      });

      it('should not display error message when emails are the same', () => {
        const controls = component.form.controls;
        controls['email'].setValue('john@acme.com');
        controls['emailConfirmation'].setValue('john@acme.com');

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
      const controls = component.form.controls;
      controls['email'].setValue('john@acme.com');
      controls['emailConfirmation'].setValue('john@acme.com');
      controls['termsAndConditions'].setValue('true');

      fixture.detectChanges();

      component.onSubmit();

      fixture.whenStable().then(() => {
        expect(component.form.valid).toBeTruthy();
        expect(isFormControlDisplayingError('email')).toBeFalsy();
        expect(isFormControlDisplayingError('emailConfirmation')).toBeFalsy();
        expect(isFormControlDisplayingError('termsAndConditions')).toBeFalsy();
      });
    });

    it('should not submit when form is populated incorrectly', () => {
      component.onSubmit();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.form.valid).toBeFalsy();
        expect(isFormControlDisplayingError('email')).toBeTruthy();
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
