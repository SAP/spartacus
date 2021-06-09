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

  form: FormGroup = new FormGroup({
    userEmail: new FormControl('', [
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
}
