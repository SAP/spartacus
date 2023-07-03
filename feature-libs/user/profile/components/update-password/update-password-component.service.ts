/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Optional } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UpdatePasswordComponentService {
  // TODO(CXSPA-1697): make AuthRedirectService and AuthService a required dependency
  constructor(
    userPasswordService: UserPasswordFacade,
    routingService: RoutingService,
    globalMessageService: GlobalMessageService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    authRedirectService: AuthRedirectService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    authService: AuthService
  );

  /*
   * @deprecated since 5.1
   */
  constructor(
    userPasswordService: UserPasswordFacade,
    routingService: RoutingService,
    globalMessageService: GlobalMessageService
  );

  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    @Optional() protected authRedirectService?: AuthRedirectService,
    @Optional() protected authService?: AuthService
  ) {}

  protected busy$ = new BehaviorSubject(false);

  isUpdating$ = this.busy$.pipe(
    tap((state) => (state === true ? this.form.disable() : this.form.enable()))
  );

  form: UntypedFormGroup = new UntypedFormGroup(
    {
      oldPassword: new UntypedFormControl('', Validators.required),
      newPassword: new UntypedFormControl('', [
        Validators.required,
        CustomFormValidators.passwordValidator,
      ]),
      newPasswordConfirm: new UntypedFormControl('', Validators.required),
    },
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'newPassword',
        'newPasswordConfirm'
      ),
    }
  );

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

    this.userPasswordService.update(oldPassword, newPassword).subscribe({
      next: () => this.onSuccess(),
      error: (error: Error) => this.onError(error),
    });
  }

  protected onSuccess(): void {
    this.globalMessageService.add(
      { key: 'updatePasswordForm.passwordUpdateSuccess' },
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

  protected onError(_error: Error): void {
    this.busy$.next(false);
    this.form.reset();
  }
}
