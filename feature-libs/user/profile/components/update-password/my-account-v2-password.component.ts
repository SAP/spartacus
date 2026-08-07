/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import {
  FeatureDirective,
  GlobalMessageType,
  PageMetaService,
  TranslatePipe,
} from '@spartacus/core';
import {
  FormErrorsComponent,
  getPageTitle,
  MessageComponent,
  PasswordVisibilityToggleDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';

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
    FeatureDirective,
  ],
})
export class MyAccountV2PasswordComponent {
  protected service = inject(UpdatePasswordComponentService);
  protected pageMetaService = inject(PageMetaService);
  showingAlert: boolean = true;
  globalMessageType = GlobalMessageType;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;
  pageTitle$ = getPageTitle(this.pageMetaService);

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
