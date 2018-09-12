import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
@Component({
  selector: 'y-reset-new-password-form',
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
        password: ['', [Validators.required, this.validatePassword]],
        repassword: ['', [Validators.required]]
      },
      { validator: this.matchPassword }
    );
  }

  changePassword() {
    // TODO: We need API to send our password and repassword
    // TODO: After changing password, login
  }

  private validatePassword(fc: FormControl) {
    const password = fc.value as string;
    return password.match(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^*()_+{};:.,]).{6,}$'
    )
      ? null
      : { InvalidPassword: true };
  }

  private matchPassword(ac: AbstractControl) {
    if (ac.get('password').value !== ac.get('repassword').value) {
      return { NotEqual: true };
    }
  }
}
