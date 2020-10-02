import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutingService, UserService } from '@spartacus/core';
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
    private routingService: RoutingService
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
      // TODO: Should we do something different here in case of implicit/code flow
      // Don't redirect in different flows
      this.routingService.go({ cxRoute: 'login' });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
