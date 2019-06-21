import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../../../shared/utils/forms/form-utils';
import { CustomFormValidators } from '../../../../../shared/utils/validators/custom-form-validators';
@Component({
  selector: 'cx-update-password-form',
  templateUrl: './update-password-form.component.html',
})
export class UpdatePasswordFormComponent implements OnInit {
  private submitClicked = false;
  form: FormGroup;

  @Output()
  submited = new EventEmitter<{ oldPassword: string; newPassword: string }>();

  @Output()
  cancelled = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: [
          '',
          [Validators.required, CustomFormValidators.passwordValidator],
        ],
        newPasswordConfirm: ['', [Validators.required]],
      },
      { validator: this.matchPassword }
    );
  }

  isNotValid(formControlName: string): boolean {
    return FormUtils.isNotValidField(
      this.form,
      formControlName,
      this.submitClicked
    );
  }

  isPasswordConfirmNotValid(): boolean {
    return (
      this.form.hasError('NotEqual') &&
      (this.submitClicked ||
        (this.form.get('newPasswordConfirm').touched &&
          this.form.get('newPasswordConfirm').dirty))
    );
  }

  onSubmit(): void {
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }

    this.submited.emit({
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword,
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  private matchPassword(abstractControl: AbstractControl): ValidationErrors {
    if (
      abstractControl.get('newPassword').value !==
      abstractControl.get('newPasswordConfirm').value
    ) {
      return { NotEqual: true };
    }
    return null;
  }
}
