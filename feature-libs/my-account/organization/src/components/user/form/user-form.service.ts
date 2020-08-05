import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { B2BUser } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  getForm(model?: B2BUser): FormGroup {
    const form = new FormGroup({});
    this.build(form);
    if (model) {
      form.patchValue(model);
      this.pathRoles(form, model);
    }
    return form;
  }

  protected build(form: FormGroup) {
    form.setControl('titleCode', new FormControl(''));
    form.setControl(
      'email',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.emailValidator,
      ])
    );
    form.setControl('firstName', new FormControl('', Validators.required));
    form.setControl('lastName', new FormControl('', Validators.required));
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
    form.setControl('roles', new FormArray([]));
    form.setControl('isAssignedToApprovers', new FormControl(false));
  }

  protected pathRoles(form, model) {
    const roles = form.get('roles') as FormArray;
    model.roles?.forEach((role) => {
      roles.push(new FormControl(role));
    });
  }
}
