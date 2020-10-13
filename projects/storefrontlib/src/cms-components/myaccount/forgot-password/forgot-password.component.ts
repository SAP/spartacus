import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthConfigService,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { OAuthFlow } from 'projects/core/src/auth/user-auth/models/oAuth-flow';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';
@Component({
  selector: 'cx-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private routingService: RoutingService,
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
