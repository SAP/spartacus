import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordFormService {
  getForm(): FormGroup {
    const form = new FormGroup({});
    this.build(form);
    return form;
  }

  protected build(form: FormGroup) {
    form.setControl(
      'password',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.passwordValidator,
      ])
    );
    form.setControl(
      'confirmPassword',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.passwordValidator,
      ])
    );
    form.setValidators(
      CustomFormValidators.passwordsMustMatch('password', 'confirmPassword')
    );
  }
}
