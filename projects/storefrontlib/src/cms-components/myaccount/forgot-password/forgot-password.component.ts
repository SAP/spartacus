import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutingService, UserService } from '@spartacus/core';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';
@Component({
  selector: 'cx-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  submited = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userEmail: [
        '',
        [Validators.required, CustomFormValidators.emailValidator],
      ],
    });
  }

  requestForgotPasswordEmail() {
    this.submited = true;

    if (this.form.invalid) {
      return;
    }
    this.userService.requestForgotPasswordEmail(this.form.value.userEmail);
    this.routingService.go({ cxRoute: 'login' });
  }
}
