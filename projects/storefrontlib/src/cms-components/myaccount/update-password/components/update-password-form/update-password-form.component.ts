import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../../../../shared/utils/validators/custom-form-validators';

/**
 * @deprecated since 3.2, use @spartacus/user package instead.
 */
@Component({
  selector: 'cx-update-password-form',
  templateUrl: './update-password-form.component.html',
})
export class UpdatePasswordFormComponent implements OnInit {
  updatePasswordForm: FormGroup;

  @Output()
  submitted = new EventEmitter<{ oldPassword: string; newPassword: string }>();

  @Output()
  cancelled = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.updatePasswordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: [
          '',
          [Validators.required, CustomFormValidators.passwordValidator],
        ],
        newPasswordConfirm: ['', [Validators.required]],
      },
      {
        validators: CustomFormValidators.passwordsMustMatch(
          'newPassword',
          'newPasswordConfirm'
        ),
      }
    );
  }

  onSubmit(): void {
    if (this.updatePasswordForm.valid) {
      this.submitted.emit({
        oldPassword: this.updatePasswordForm.value.oldPassword,
        newPassword: this.updatePasswordForm.value.newPassword,
      });
    } else {
      this.updatePasswordForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
