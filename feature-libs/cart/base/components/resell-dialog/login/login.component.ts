/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Output() nextStep = new EventEmitter<string>();

  constructor() {
    // Intentional empty constructor
  }

  submitLogin() {
    this.nextStep.emit('login');
    return false;
  }
}
