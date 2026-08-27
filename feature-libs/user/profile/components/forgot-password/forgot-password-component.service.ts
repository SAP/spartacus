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
  AuthConfigService,
  GlobalMessageService,
  GlobalMessageType,
  OAuthFlow,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ForgotPasswordComponentService {
  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected authConfigService: AuthConfigService,
    protected globalMessage: GlobalMessageService
  ) {}

  protected busy$ = new BehaviorSubject(false);

  isUpdating$ = this.busy$.pipe(
    tap((state) => (state === true ? this.form.disable() : this.form.enable()))
  );

  form: UntypedFormGroup = new UntypedFormGroup({
    userEmail: new UntypedFormControl('', [
      Validators.required,
      CustomFormValidators.emailValidator,
    ]),
  });

  /**
   * Sends an email to the user to reset the password.
   *
   * When the `ResourceOwnerPasswordFlow` is used, the user is routed
   * to the login page.
   */
  requestEmail() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    this.userPasswordService
      .requestForgotPasswordEmail(this.form.value.userEmail)
      .subscribe({
        next: () => this.onSuccess(),
        error: (error: Error) => this.onError(error),
      });
  }

  protected onSuccess(): void {
    this.globalMessage.add(
      { key: 'forgottenPassword.passwordResetEmailSent' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.busy$.next(false);
    this.form.reset();
    this.redirect();
  }

  protected onError(_error: Error): void {
    this.busy$.next(false);
  }

  /**
   * Redirects the user back to the login page.
   *
   * Routes to `login` when the OAuth flow is `ResourceOwnerPasswordFlow`.
   * Routes to `loginForm` when custom login is enabled.
   * No navigation occurs for other OAuth flows, as they require navigation to an external login page.
   */
  protected redirect() {
    const flow = this.authConfigService.getOAuthFlow();
    if (flow === OAuthFlow.ResourceOwnerPasswordFlow) {
      this.routingService.go({ cxRoute: 'login' });
    } else if (this.authConfigService.customLoginEnabled()) {
      this.routingService.go({ cxRoute: 'loginForm' });
    }
  }
}
