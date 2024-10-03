/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
    const form = new UntypedFormGroup({});
    form.setControl(
      'code',
      new UntypedFormControl('', [
        Validators.required,
        CustomFormValidators.noSpecialCharacters,
      ])
    );
    form.setControl('name', new UntypedFormControl('', Validators.required));
    form.setControl(
      'startDate',
      new UntypedFormControl('', [
        Validators.required,
        CustomFormValidators.patternValidation((date) =>
          this.datePickerService.isValidFormat(date)
        ),
      ])
    );
    form.setControl(
      'endDate',
      new UntypedFormControl('', [
        Validators.required,
        CustomFormValidators.patternValidation((date) =>
          this.datePickerService.isValidFormat(date)
        ),
      ])
    );
    form.setControl(
      'budget',
      new UntypedFormControl('', [
        Validators.required,
        CustomFormValidators.mustBePositive,
      ])
    );

    form.setControl(
      'currency',
      new UntypedFormGroup({
        isocode: new UntypedFormControl(undefined, Validators.required),
      })
    );
    form.setControl(
      'orgUnit',
      new UntypedFormGroup({
        uid: new UntypedFormControl(undefined, Validators.required),
      })
    );
    form.setValidators(
      CustomFormValidators.dateRange('startDate', 'endDate', (date) =>
        this.datePickerService.getDate(date)
      ) as ValidatorFn
    );
    this.form = form;
  }
}
