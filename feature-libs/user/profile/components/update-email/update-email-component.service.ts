/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
// eslint-disable-next-line @nx/workspace-no-self-public-api-import -- ESLint is misfiring here: core and root are not the same library — they're separate entry points
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UpdateEmailComponentService {
  constructor(
    protected userEmail: UserEmailFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService
  ) {}

  protected busy$ = new BehaviorSubject(false);

  updateSucceed$ = new Subject();

  isUpdating$ = this.busy$.pipe(
    tap((state) => (state === true ? this.form.disable() : this.form.enable()))
  );

  form: UntypedFormGroup = new UntypedFormGroup(
    {
      email: new UntypedFormControl('', [
        Validators.required,
        CustomFormValidators.emailValidator,
      ]),
      confirmEmail: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required]),
    },
    {
      validators: CustomFormValidators.emailsMustMatch('email', 'confirmEmail'),
    }
  );

  save(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const newEmail = this.form.get('confirmEmail')?.value;
    const password = this.form.get('password')?.value;

    this.userEmail.update(password, newEmail).subscribe({
      next: () => this.onSuccess(newEmail),
      error: (error: Error) => this.onError(error),
    });
  }

  /**
   * Handles successful updating of the user email.
   */
  protected onSuccess(newUid: string): void {
    this.globalMessageService.add(
      {
        key: 'updateEmailForm.emailUpdateSuccess',
        params: { newUid },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.busy$.next(false);
    this.form.reset();
    this.updateSucceed$.next(true);

    // sets the redirect url after login
    this.authRedirectService.setRedirectUrl(
      this.routingService.getUrl({ cxRoute: 'home' })
    );
    // TODO(#9638): Use logout route when it will support passing redirect url
    this.authService.coreLogout().then(() => {
      // The email change invalidates the current token, so the token revocation
      // during logout can fail (e.g. HTTP 500). AuthService.coreLogout() still
      // resolves and logs the user out regardless (via its `.finally`), so we
      // only need to clear the error banner the HTTP interceptor produced for
      // that 500.
      this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
      this.routingService.go(
        { cxRoute: 'login' },
        {
          state: {
            newUid,
          },
        }
      );
    });
  }

  protected onError(_error: Error): void {
    this.busy$.next(false);
    this.updateSucceed$.next(false);
  }
}
