/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeatureDirective } from '@spartacus/core';
import { LoginRegisterComponent } from '../login-register.component';

@Component({
  selector: 'cx-login-register-b2b',
  templateUrl: './login-register-b2b.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [LoginRegisterComponent, FeatureDirective],
})
export class LoginRegisterB2BComponent {}
