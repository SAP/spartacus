import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CustomFormValidators } from '../../../../lib/ui/validators/custom-form-validators';
import { FormUtils } from '../../../../lib/utils/forms/form-utils';

@Component({
  selector: 'cx-update-email-form',
  templateUrl: './update-email-form.component.html',
  styleUrls: ['./update-email-form.component.scss'],
})
export class UpdateEmailFormComponent {
  submited = false;

  @Output()
  saveEmail = new EventEmitter<{
    newUid: string;
    password: string;
  }>();

  @Output()
  cancelEmail = new EventEmitter<void>();

  form: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      confirmEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    },
    { validator: this.matchEmail }
  );

  constructor(private fb: FormBuilder) {}

  isEmailConfirmNotValid(formControlName: string): boolean {
    return (
      this.form.hasError('NotEqual') &&
      (this.submited ||
        (this.form.get(formControlName).touched &&
          this.form.get(formControlName).dirty))
    );
  }

  isNotValid(formControlName: string): boolean {
    return FormUtils.isNotValidField(this.form, formControlName, this.submited);
  }

  onSubmit(): void {
    this.submited = true;

    if (this.form.invalid) {
      return;
    }

    const newUid = this.form.value.confirmEmail;
    const password = this.form.value.password;

    this.saveEmail.emit({ newUid, password });
  }

  onCancel(): void {
    this.cancelEmail.emit();
  }

  private matchEmail(ac: AbstractControl): ValidationErrors {
    if (ac.get('email').value !== ac.get('confirmEmail').value) {
      return { NotEqual: true };
    }
  }
}
