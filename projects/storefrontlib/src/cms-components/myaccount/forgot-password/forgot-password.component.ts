import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthConfigService,
  OAuthFlow,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';
@Component({
  selector: 'cx-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected userService: UserService,
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
      this.userService.requestForgotPasswordEmail(
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
