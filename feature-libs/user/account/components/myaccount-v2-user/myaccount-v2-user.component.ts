/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { LoginComponent } from '../login';

@Component({
  selector: 'cx-myaccount-v2-user',
  templateUrl: './myaccount-v2-user.component.html',
})
export class MyAccountV2UserComponent extends LoginComponent {}
