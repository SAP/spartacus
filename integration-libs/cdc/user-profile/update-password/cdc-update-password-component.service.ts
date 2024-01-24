/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import {
  USE_MY_ACCOUNT_V2_PASSWORD,
  UpdatePasswordComponentService,
} from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';

@Injectable()
export class CDCUpdatePasswordComponentService extends UpdatePasswordComponentService {
  enableMyAccountV2 = inject(USE_MY_ACCOUNT_V2_PASSWORD);
  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected authRedirectService: AuthRedirectService,
    protected authService: AuthService,
    protected cdcJsService: CdcJsService
  ) {
    super(
      userPasswordService,
      routingService,
      globalMessageService,
      authRedirectService,
      authService
    );
    if (this.enableMyAccountV2) {
      this.form.addControl(
        'newPassword',
        new UntypedFormControl('', Validators.required)
      );
    }
  }

  /**
   * Updates the password for the user.
   */
  updatePassword(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const oldPassword = this.form.get('oldPassword')?.value;
    const newPassword = this.form.get('newPassword')?.value;

    this.cdcJsService
      .updateUserPasswordWithoutScreenSet(oldPassword, newPassword)
      .subscribe({
        next: () => this.onSuccess(),
        error: (error) => this.onError(error),
      });
  }

  protected onSuccess(): void {
    let successMessage;
    if (this.enableMyAccountV2) {
      successMessage = { key: 'myAccountV2PasswordForm.passwordUpdateSuccess' };
    } else {
      successMessage = { key: 'updatePasswordForm.passwordUpdateSuccess' };
    }
    this.globalMessageService.add(
      successMessage,
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.busy$.next(false);
    this.form.reset();

    // sets the redirect url after login
    this.authRedirectService?.setRedirectUrl(
      this.routingService.getUrl({ cxRoute: 'home' })
    );
    // TODO(#9638): Use logout route when it will support passing redirect url
    this.authService?.coreLogout().then(() => {
      this.routingService.go({ cxRoute: 'login' });
    });
  }

  protected onError(_error: any): void {
    let errorMessage;
    if (this.enableMyAccountV2) {
      errorMessage = { key: 'myAccountV2PasswordForm.accessDeniedError' };
    } else {
      errorMessage = _error?.errorDetails || ' ';
    }
    this.globalMessageService.add(
      errorMessage,
      GlobalMessageType.MSG_TYPE_ERROR
    );
    this.busy$.next(false);
  }
}
