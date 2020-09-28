import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '@spartacus/storefront';
import { OrganizationFormService } from '../../shared/organization-form';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordFormService extends OrganizationFormService<any> {
  /**
   * @override
   * Adds the password and confirmPassword field. Also adds the customerId field,
   * so that the customerId can be used during persistent.
   */
  protected build() {
    const form = new FormGroup({});
    form.setControl('customerId', new FormControl(''));
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
    this.form = form;
  }
}
