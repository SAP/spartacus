import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../../shared/utils';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UpdateEmailFormService {
  constructor(
    protected fb: FormBuilder
  ) {
  }

  updateEmailForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      confirmEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    },
    {
      validators: CustomFormValidators.emailsMustMatch('email', 'confirmEmail'),
    }
  );
}
