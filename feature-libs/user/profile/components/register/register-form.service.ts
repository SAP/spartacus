/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { ConsentTemplate } from '@spartacus/core';

@Injectable()
export class RegisterFormService {
  constructor(protected fb: UntypedFormBuilder) {}

  loadExtraRegistrationConsents(): {
    template: ConsentTemplate;
    required: boolean;
  }[] {
    return [];
  }

  generateConsentsFormControl(): UntypedFormArray {
    return this.fb.array([]);
  }
}
