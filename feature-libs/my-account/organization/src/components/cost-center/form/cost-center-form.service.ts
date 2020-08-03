import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CostCenter } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CostCenterFormService {
  getForm(model?: CostCenter): FormGroup {
    const form = new FormGroup({});
    this.build(form);
    if (model) {
      form.patchValue(model);
    }
    return form;
  }

  protected build(form: FormGroup) {
    form.setControl(
      'code',
      new FormControl('', [Validators.required, this.codeValidator])
    );
    form.setControl('name', new FormControl('', Validators.required));

    form.setControl(
      'currency',
      new FormGroup({
        isocode: new FormControl(undefined, Validators.required),
      })
    );
    form.setControl(
      'unit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
  }

  private codeValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    if (
      (control.value && control.value.match(/edit/gi)) ||
      control.value.match(/create/gi)
    ) {
      return { cxInvalidCostCenterCode: true };
    }
    return null;
  }
}
