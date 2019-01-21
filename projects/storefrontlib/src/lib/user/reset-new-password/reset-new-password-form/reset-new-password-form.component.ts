import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { CustomFormValidators } from '../../../ui/validators/custom-form-validators';

@Component({
  selector: 'cx-reset-new-password-form',
  templateUrl: './reset-new-password-form.component.html',
  styleUrls: ['./reset-new-password-form.component.scss']
})
export class ResetNewPasswordFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // TODO: We need API to verify token, and get address email

    this.form = this.fb.group(
      {
        password: [
          '',
          [Validators.required, CustomFormValidators.passwordValidator]
        ],
        repassword: ['', [Validators.required]]
      },
      { validator: this.matchPassword }
    );
  }

  changePassword() {
    // TODO: We need API to send our password and repassword
    // TODO: After changing password, login
  }

  private matchPassword(ac: AbstractControl) {
    if (ac.get('password').value !== ac.get('repassword').value) {
      return { NotEqual: true };
    }
  }
}
