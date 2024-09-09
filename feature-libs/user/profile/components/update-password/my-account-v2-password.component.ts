/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalMessageType, FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { Observable } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { SpinnerModule, MessageComponentModule, PasswordVisibilityToggleModule, FormErrorsModule } from '@spartacus/storefront';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-my-account-v2-password',
    templateUrl: './my-account-v2-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        SpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MessageComponentModule,
        PasswordVisibilityToggleModule,
        FeaturesConfigModule,
        FormErrorsModule,
        AsyncPipe,
        I18nModule,
    ],
})
export class MyAccountV2PasswordComponent {
  protected service = inject(UpdatePasswordComponentService);
  showingAlert: boolean = true;
  globalMessageType = GlobalMessageType;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  onSubmit(): void {
    this.service.updatePassword();
  }

  onCancel(): void {
    this.oldPassword = '';
    this.newPassword = '';
    this.newPasswordConfirm = '';
  }
  closeDialogConfirmationAlert() {
    this.showingAlert = false;
  }
}
