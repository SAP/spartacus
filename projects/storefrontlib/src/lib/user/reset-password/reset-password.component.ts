import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../ui/validators/custom-form-validators';
import { UserService } from '@spartacus/core';
@Component({
  selector: 'cx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.form = this.fb.group({
      userId: ['', [Validators.required, CustomFormValidators.emailValidator]]
    });
  }

  requestForgotPasswordEmail() {
    this.userService.requestForgotPasswordEmail(this.form.value.userId);
  }
}
