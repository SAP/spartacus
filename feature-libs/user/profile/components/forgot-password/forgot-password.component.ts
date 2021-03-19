import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthConfigService,
  GlobalMessageService,
  GlobalMessageType,
  OAuthFlow,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';

@Component({
  selector: 'cx-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected userPassword: UserPasswordFacade,
    protected routingService: RoutingService,
    protected authConfigService: AuthConfigService,
    protected globalMessage: GlobalMessageService
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      userEmail: [
        '',
        [Validators.required, CustomFormValidators.emailValidator],
      ],
    });
  }

  requestForgotPasswordEmail() {
    if (this.forgotPasswordForm.valid) {
      this.userPassword
        .requestForgotPasswordEmail(this.forgotPasswordForm.value.userEmail)
        .pipe()
        .subscribe(() => {
          this.globalMessage.add(
            { key: 'forgottenPassword.passwordResetEmailSent' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        });

      if (
        this.authConfigService.getOAuthFlow() ===
        OAuthFlow.ResourceOwnerPasswordFlow
      ) {
        this.routingService.go({ cxRoute: 'login' });
      }
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
