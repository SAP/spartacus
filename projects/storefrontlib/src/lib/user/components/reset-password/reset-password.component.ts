import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidationService } from '../../../ui/services/form-validation/form-validation.service';

@Component({
  selector: 'y-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private fv: FormValidationService) {}

  ngOnInit() {
    this.form = this.fb.group({
      userId: [
        '',
        [Validators.email, this.fv.Validators.emailDomain, Validators.required]
      ]
    });
  }

  requestPasswordReset() {
    // @TODO: Add reset password logic.
  }
}
