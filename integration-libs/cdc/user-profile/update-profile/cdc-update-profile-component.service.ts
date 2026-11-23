/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { UserProfileFacade } from '@spartacus/user/profile/root';

@Injectable()
export class CDCUpdateProfileComponentService extends UpdateProfileComponentService {
  protected override userProfile = inject(UserProfileFacade);
  protected override globalMessageService = inject(GlobalMessageService);
  protected cdcJsService = inject(CdcJsService);

  /**
   * Updates the user's details and handles the UI.
   */
  updateProfile(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const formValue = this.form.value;
    this.cdcJsService.updateProfileWithoutScreenSet(formValue).subscribe({
      next: () => this.onSuccess(),
      error: (error) => this.onError(error),
    });
  }

  protected onError(_error: any): void {
    const errorMessage = _error?.errorMessage || ' ';
    this.globalMessageService.add(
      errorMessage,
      GlobalMessageType.MSG_TYPE_ERROR
    );
    this.busy$.next(false);
  }
}
