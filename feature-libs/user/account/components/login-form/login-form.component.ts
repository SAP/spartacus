/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  host: { ngSkipHydration: 'true' },
})
export class LoginFormComponent {
  @ViewChild('loginForm') loginForm: ElementRef<HTMLElementTagNameMap['form']>;
  @HostBinding('class.user-form') style = true;
  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;
  csrf = this.service.csrf;
  action = this.service.action;
  method = this.service.method;

  constructor(protected service: LoginFormComponentService) {
    this.service.handleCustomLoginError();
  }

  onSubmit(): void {
    this.service.login(this.loginForm?.nativeElement);
  }
}
