import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FormUtils } from '../../../shared/utils/forms/form-utils';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';
import {
  CartService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';

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
      termsAndConditions: ['', [Validators.requiredTrue]],
    },
    { validator: this.emailsMatch }
  );
  private submitClicked = false;

  constructor(
    private formBuilder: FormBuilder,
    protected globalMessageService: GlobalMessageService,
    protected cartService: CartService
  ) {}

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
      this.validateTermsAndConditions();
      return;
    }

    const email = this.form.value.email;
    this.cartService.addEmail(email);
  }

  private validateTermsAndConditions() {
    const value = this.form.get('termsAndConditions').value;
    if (value !== 'true') {
      this.globalMessageService.add(
        {
          key: 'checkoutLogin.termsAndConditionsIsRequired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  private emailsMatch(abstractControl: AbstractControl): { NotEqual: boolean } {
    return abstractControl.get('email').value !==
      abstractControl.get('emailConfirmation').value
      ? { NotEqual: true }
      : null;
  }
}
