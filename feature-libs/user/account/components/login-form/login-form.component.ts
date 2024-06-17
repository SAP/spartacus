/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';

declare var gigya: any;

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  constructor(protected service: LoginFormComponentService) {
    gigya.accounts.addEventHandlers({
      onLogin: (account: any) => {
        this.service.onCDCLoginSuccess(account);
      },
    });
  }

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  @HostBinding('class.user-form') style = true;

  onSubmit(): void {
    this.service.login();
  }

  showCDCLoginForm(): void {
    gigya.accounts.showScreenSet({
      screenSet: 'Default-RegistrationLogin',
      onBeforeSubmit: (event: any) => {
        console.log('onBeforeSubmit', event);
      }
    });
  }
}
