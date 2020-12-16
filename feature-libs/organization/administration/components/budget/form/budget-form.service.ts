import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Budget } from '@spartacus/organization/administration/core';
import { CustomFormValidators, DatePickerService } from '@spartacus/storefront';
import { FormService } from '../../shared/form/form.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetFormService extends FormService<Budget> {
  constructor(protected datePickerService: DatePickerService) {
    super();
  }

  protected build() {
    const form = new FormGroup({});
    form.setControl(
      'code',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.noSpecialCharacters,
      ])
    );
    form.setControl('name', new FormControl('', Validators.required));
    form.setControl(
      'startDate',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.datePatternValidation(this.datePickerService),
      ])
    );
    form.setControl(
      'endDate',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.datePatternValidation(this.datePickerService),
      ])
    );
    form.setControl(
      'budget',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.mustBePositive,
      ])
    );

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
    form.setValidators(
      CustomFormValidators.dateRange(
        'startDate',
        'endDate',
        this.datePickerService
      )
    );
    this.form = form;
  }
}
