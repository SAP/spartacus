import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-update-email-form',
  templateUrl: './update-email-form.component.html',
})
export class UpdateEmailFormComponent {
  @Output()
  saveEmail = new EventEmitter<{
    newUid: string;
    password: string;
  }>();

  @Output()
  cancelEmail = new EventEmitter<void>();

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

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.updateEmailForm.valid) {
      const newUid = this.updateEmailForm.get('confirmEmail').value;
      const password = this.updateEmailForm.get('password').value;

      this.saveEmail.emit({ newUid, password });
    } else {
      this.updateEmailForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancelEmail.emit();
  }
}
