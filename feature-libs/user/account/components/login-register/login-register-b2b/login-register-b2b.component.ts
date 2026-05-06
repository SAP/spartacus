/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { FeatureDirective } from '@spartacus/core';
import { LoginRegisterComponent } from '../login-register.component';

@Component({
  selector: 'cx-returning-b2b-customer-register',
  templateUrl: './login-register-b2b.component.html',
  imports: [LoginRegisterComponent, FeatureDirective],
})
export class LoginRegisterB2bComponent {}
