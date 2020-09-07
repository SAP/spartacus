import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Budget } from '@spartacus/my-account/organization/core';
import { OrganizationFormService } from '../../shared/organization-form/organization-form.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetFormService extends OrganizationFormService<Budget> {
  protected build() {
    const form = new FormGroup({});
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
    this.form = form;
  }
}
