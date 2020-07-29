import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Permission } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionFormService {
  getForm(model?: Permission): FormGroup {
    const form = new FormGroup({});
    this.build(form);
    if (model) {
      form.patchValue(model);
    }
    return form;
  }

  protected build(form: FormGroup) {
    form.setControl(
      'orderApprovalPermissionType',
      new FormGroup({
        code: new FormControl(null, Validators.required),
      })
    );
    form.setControl('code', new FormControl('', Validators.required));
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
    form.setControl('periodRange', new FormControl('', Validators.required));
    form.setControl(
      'currency',
      new FormGroup({
        isocode: new FormControl(undefined, Validators.required),
      })
    );
    form.setControl('threshold', new FormControl('', Validators.required));
  }
}
