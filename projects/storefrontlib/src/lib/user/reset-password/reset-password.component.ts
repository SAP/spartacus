import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../ui/validators/custom-form-validators';

@Component({
  selector: 'cx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      userId: ['', [Validators.required, CustomFormValidators.emailValidator]]
    });
  }

  requestPasswordReset() {
    // @TODO: Add reset password logic.
  }
}
