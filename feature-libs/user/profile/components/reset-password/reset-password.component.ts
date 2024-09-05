/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResetPasswordComponentService } from './reset-password-component.service';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule, PasswordVisibilityToggleModule, FormErrorsModule } from '@spartacus/storefront';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-reset-password',
    templateUrl: './reset-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'user-form' },
    standalone: true,
    imports: [
        NgIf,
        SpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordVisibilityToggleModule,
        FeaturesConfigModule,
        FormErrorsModule,
        AsyncPipe,
        I18nModule,
    ],
})
export class ResetPasswordComponent {
  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  token$: Observable<string> = this.service.resetToken$;

  constructor(protected service: ResetPasswordComponentService) {}

  onSubmit(token: string) {
    this.service.resetPassword(token);
  }
}
