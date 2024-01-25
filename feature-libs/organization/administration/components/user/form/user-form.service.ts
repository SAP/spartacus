/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { B2BUser, B2BUserRole, FeatureConfigService } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { FormService } from '../../shared/form/form.service';

@Injectable({
  providedIn: 'root',
})
export class UserFormService extends FormService<B2BUser> {
  protected readonly featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

  protected build() {
    const form = new UntypedFormGroup({});
    form.setControl('customerId', new UntypedFormControl(''));
    form.setControl('titleCode', new UntypedFormControl(''));
    form.setControl(
      'firstName',
      new UntypedFormControl('', Validators.required)
    );
    form.setControl(
      'lastName',
      new UntypedFormControl('', Validators.required)
    );
    form.setControl(
      'email',
      new UntypedFormControl('', [
        Validators.required,
        CustomFormValidators.emailValidator,
      ])
    );
    form.setControl(
      'orgUnit',
      new UntypedFormGroup({
        uid: new UntypedFormControl(undefined, Validators.required),
      })
    );
    form.setControl('roles', new UntypedFormArray([]));
    form.setControl('isAssignedToApprovers', new UntypedFormControl(false));

    form.get('roles')?.valueChanges.subscribe((roles: string[]) => {
      if (roles.includes(B2BUserRole.APPROVER)) {
        form.get('isAssignedToApprovers')?.enable();
      } else {
        form.get('isAssignedToApprovers')?.disable();
        form.get('isAssignedToApprovers')?.reset();
      }
    });

    this.form = form;
  }

  protected patchData(item: B2BUser) {
    super.patchData(item);
    if (item) {
      const roles = this.form?.get('roles') as UntypedFormArray;
      item.roles?.forEach((role) => {
        if (!(roles.value as string[]).includes(role)) {
          roles.push(new UntypedFormControl(role));
        }
      });

      if (this.featureConfigService?.isLevel('6.7')) {
        this.form?.get('email')?.setValue(item?.displayUid);
      }
    }
  }
}
