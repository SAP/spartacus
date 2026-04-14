/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FeatureDirective, TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  PasswordVisibilityToggleDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
  imports: [
    NgIf,
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredLegendComponent,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    PasswordVisibilityToggleDirective,
    FeatureDirective,
    RouterLink,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class LoginFormComponent {
  @ViewChild('loginForm') loginForm: ElementRef<HTMLElementTagNameMap['form']>;
  @HostBinding('class.user-form') style = true;
  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;
  csrf = this.service.csrf;
  action = this.service.action;
  method = this.service.method;
  showResetPassword = signal(this.service.showResetPassword);

  constructor(protected service: LoginFormComponentService) {
    this.service.handleCustomLoginError();
  }

  onSubmit(): void {
    this.service.login(this.loginForm?.nativeElement);
  }
}
