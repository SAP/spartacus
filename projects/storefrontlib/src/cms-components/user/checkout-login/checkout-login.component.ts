import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-checkout-login',
  templateUrl: './checkout-login.component.html',
})
export class CheckoutLoginComponent {
  checkoutEmailForm: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      emailConfirmation: [
        '',
        Validators.required,
        CustomFormValidators.emailValidator,
      ],
      termsAndConditions: ['', Validators.required],
    },
    { validator: this.emailsMatch }
  );

  constructor(private formBuilder: FormBuilder) {}

  checkout() {
    const userId = this.checkoutEmailForm.controls.email.value.toLowerCase();
    return userId;
  }

  private emailsMatch(abstractControl: AbstractControl): { NotEqual: boolean } {
    if (
      abstractControl.get('email').value !==
      abstractControl.get('emailConfirmation').value
    ) {
      return { NotEqual: true };
    }
  }
}
