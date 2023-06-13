/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { ConsentTemplate } from '@spartacus/core';

@Injectable()
export class RegisterConsentsService {
  constructor(protected fb: UntypedFormBuilder) {}

  loadAdditionalConsents(): {
    template: ConsentTemplate;
    required: boolean;
  }[] {
    return [];
  }

  generateAdditionalConsentsFormControl(): UntypedFormArray {
    return this.fb.array([]);
  }
}
