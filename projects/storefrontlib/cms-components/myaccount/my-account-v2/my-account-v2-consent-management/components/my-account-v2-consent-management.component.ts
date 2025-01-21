/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ConsentManagementComponent } from '../../../consent-management/components/consent-management.component';

@Component({
  selector: 'cx-my-account-v2-consent-management',
  templateUrl: './my-account-v2-consent-management.component.html',
})
export class MyAccountV2ConsentManagementComponent extends ConsentManagementComponent {}
