/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
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
  HttpErrorModel,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UpdatePasswordComponentService {
  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected authRedirectService?: AuthRedirectService,
    protected authService?: AuthService
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
      error: (error: HttpErrorModel | Error) => this.onError(error),
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

  protected onError(_error: HttpErrorModel | Error): void {
    if (
      _error instanceof HttpErrorModel &&
      _error.details?.[0].type === 'AccessDeniedError'
    ) {
      this.globalMessageService.add(
        { key: 'updatePasswordForm.accessDeniedError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
    this.busy$.next(false);
    this.form.reset();
  }
}
