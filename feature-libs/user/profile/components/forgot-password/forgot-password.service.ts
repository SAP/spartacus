import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthConfigService,
  GlobalMessageService,
  GlobalMessageType,
  OAuthFlow,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected authConfigService: AuthConfigService,
    protected globalMessage: GlobalMessageService
  ) {}

  form: FormGroup = new FormGroup({
    userEmail: new FormControl('', [
      Validators.required,
      CustomFormValidators.emailValidator,
    ]),
  });

  /**
   * Handles notifying the user about the forgot password request.
   *
   * When the `ResourceOwnerPasswordFlow` is used, the user is routed
   * to the login page.
   */
  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.userPasswordService
      .requestForgotPasswordEmail(this.form.value.userEmail)
      .subscribe(() => {
        this.globalMessage.add(
          { key: 'forgottenPassword.passwordResetEmailSent' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });

    this.redirect();
  }

  /**
   * Redirects the user back to the login page.
   *
   * This only happens in case of the `ResourceOwnerPasswordFlow` OAuth flow.
   */
  protected redirect() {
    if (
      this.authConfigService.getOAuthFlow() ===
      OAuthFlow.ResourceOwnerPasswordFlow
    ) {
      this.routingService.go({ cxRoute: 'login' });
    }
  }

  /**
   * Resets the form, _not_ the password.
   */
  reset(): void {
    this.form.reset();
  }
}
