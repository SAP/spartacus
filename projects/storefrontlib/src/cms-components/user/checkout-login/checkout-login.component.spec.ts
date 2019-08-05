import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CheckoutLoginComponent } from './checkout-login.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';

fdescribe('CheckoutLoginComponent', () => {
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

  ['email', 'emailConfirmation'].forEach(field => {
    describe(`${field} form field`, () => {
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
  });
});
