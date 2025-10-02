/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalMessageType, useFeatureStyles } from '@spartacus/core';
import { Observable } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { MessageComponent } from '../../../../../projects/storefrontlib/cms-components/misc/message/message.component';
import { PasswordVisibilityToggleDirective } from '../../../../../projects/storefrontlib/shared/components/form/password-visibility-toggle/password-visibility-toggle.directive';
import { FormErrorsComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-my-account-v2-password',
    templateUrl: './my-account-v2-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { ngSkipHydration: 'true' },
    imports: [
        NgIf,
        SpinnerComponent,
        FormsModule,
        ReactiveFormsModule,
        MessageComponent,
        PasswordVisibilityToggleDirective,
        FormErrorsComponent,
        AsyncPipe,
        TranslatePipe,
        MockTranslatePipe,
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

  constructor() {
    useFeatureStyles('a11yPasswordVisibliltyBtnValueOverflow');
  }

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
