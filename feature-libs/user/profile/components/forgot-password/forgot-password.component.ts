import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthConfigService, OAuthFlow, RoutingService } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordService } from '@spartacus/user/profile/core';
@Component({
  selector: 'cx-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected userPasswordService: UserPasswordService,
    protected routingService: RoutingService,
    protected authConfigService: AuthConfigService
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
      this.userPasswordService.requestForgotPasswordEmail(
        this.forgotPasswordForm.value.userEmail
      );
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
