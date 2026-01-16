/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { ConsentManagementComponent } from '../../../consent-management/components/consent-management.component';
import { MyAccountV2ConsentManagementFormComponent } from './consent-form/my-account-v2-consent-management-form.component';

@Component({
  selector: 'cx-my-account-v2-consent-management',
  templateUrl: './my-account-v2-consent-management.component.html',
  imports: [
    NgIf,
    SpinnerComponent,
    NgFor,
    MyAccountV2ConsentManagementFormComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class MyAccountV2ConsentManagementComponent extends ConsentManagementComponent {}
