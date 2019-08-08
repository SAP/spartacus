import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FormUtils } from '../../../shared/utils/forms/form-utils';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-checkout-login',
  templateUrl: './checkout-login.component.html',
})
export class CheckoutLoginComponent {
  form = this.formBuilder.group(
    {
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      emailConfirmation: [
        '',
        [Validators.required, CustomFormValidators.emailValidator],
      ],
      termsAndConditions: ['', []],
    },
    { validator: this.emailsMatch }
  );
  private submitClicked = false;

  constructor(private formBuilder: FormBuilder) {}

  isNotValid(formControlName: string): boolean {
    return FormUtils.isNotValidField(
      this.form,
      formControlName,
      this.submitClicked
    );
  }

  isEmailConfirmInvalid(): boolean {
    return (
      this.form.hasError('NotEqual') &&
      (this.form.get('emailConfirmation').touched &&
        this.form.get('emailConfirmation').dirty)
    );
  }

  onSubmit() {
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }
  }

  private emailsMatch(abstractControl: AbstractControl): { NotEqual: boolean } {
    return abstractControl.get('email').value !==
      abstractControl.get('emailConfirmation').value
      ? { NotEqual: true }
      : null;
  }
}
