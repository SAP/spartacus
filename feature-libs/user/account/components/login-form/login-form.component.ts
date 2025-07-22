/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  ViewChild,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AuthConfigService, Config, useFeatureStyles } from '@spartacus/core';
import { Observable } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LoginFormComponent {
  @ViewChild('loginForm') loginForm: ElementRef<HTMLElementTagNameMap['form']>;

  constructor(protected service: LoginFormComponentService) {
    useFeatureStyles('a11yPasswordVisibliltyBtnValueOverflow');
  }

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  config = inject(Config);

  // action = this.config?.authentication?.customLoginPage?.loginForm;
  // customLogin = this.config?.authentication?.customLoginPage?.enabled;

  @HostBinding('class.user-form') style = true;

  onSubmit(): void {
    this.service.login();
  }

  setCustom() {
    if (this.config?.authentication?.customLoginPage?.enabled) {
      const configService = inject(AuthConfigService);

      if (this.loginForm?.nativeElement) {
        this.loginForm.nativeElement.method = 'POST';
        this.loginForm.nativeElement.action =
          configService?.getCustomLoginFormEndpoint();
      }
    }
  }
}
