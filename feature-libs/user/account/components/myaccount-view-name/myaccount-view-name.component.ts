/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { LoginComponent } from '../login';

@Component({
  selector: 'cx-myaccount-view-name',
  templateUrl: './myaccount-view-name.component.html',
  styleUrls: ['./myaccount-view-name.component.scss'],
})
export class MyaccountViewNameComponent extends LoginComponent {}
