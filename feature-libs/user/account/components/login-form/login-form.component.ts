/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import { RouterLink } from '@angular/router';
import { FeaturesConfigModule, UrlModule, I18nModule } from '@spartacus/core';
import { SpinnerModule, FormErrorsModule, PasswordVisibilityToggleModule } from '@spartacus/storefront';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-login-form',
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        SpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        FeaturesConfigModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule,
        RouterLink,
        AsyncPipe,
        UrlModule,
        I18nModule,
    ],
})
export class LoginFormComponent {
  constructor(protected service: LoginFormComponentService) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  @HostBinding('class.user-form') style = true;

  onSubmit(): void {
    this.service.login();
  }
}
