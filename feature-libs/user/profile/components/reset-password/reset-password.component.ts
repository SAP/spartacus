/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResetPasswordComponentService } from './reset-password-component.service';

@Component({
  selector: 'cx-reset-password',
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form', ngSkipHydration: 'true' },
  standalone: false,
})
export class ResetPasswordComponent {
  protected service = inject(ResetPasswordComponentService);

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  token$: Observable<string> = this.service.resetToken$;

  onSubmit(token: string) {
    this.service.resetPassword(token);
  }
}
