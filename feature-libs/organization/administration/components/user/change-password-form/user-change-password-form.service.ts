import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { FormService } from '../../shared/form/form.service';

@Injectable({
  providedIn: 'root',
})
export class UserChangePasswordFormService extends FormService<any> {
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

  getForm(item?: User): FormGroup {
    // we need do cleanup, to avoid have filled form after next open of that
    this.form = null;
    return super.getForm(item);
  }
}
