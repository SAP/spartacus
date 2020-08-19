import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Budget } from '../../../core/model/budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetFormService {
  getForm(model?: Budget): FormGroup {
    const form = new FormGroup({});
    this.build(form);
    if (model) {
      form.patchValue(model);
    }
    return form;
  }

  protected build(form: FormGroup) {
    form.setControl('code', new FormControl('', Validators.required));
    form.setControl('name', new FormControl('', Validators.required));
    form.setControl('startDate', new FormControl('', Validators.required));
    form.setControl('endDate', new FormControl('', Validators.required));
    form.setControl('budget', new FormControl('', Validators.required));

    form.setControl(
      'currency',
      new FormGroup({
        isocode: new FormControl(undefined, Validators.required),
      })
    );
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
  }
}
