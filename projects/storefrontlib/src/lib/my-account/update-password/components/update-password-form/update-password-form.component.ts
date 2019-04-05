import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../../../ui/validators/custom-form-validators';
import { FormUtils } from '../../../../utils/forms/form-utils';
@Component({
  selector: 'cx-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.css'],
})
export class UpdatePasswordFormComponent implements OnInit, OnDestroy {
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

  private matchPassword(ac: FormGroup) {
    if (ac.get('newPassword').value !== ac.get('newPasswordConfirm').value) {
      return { NotEqual: true };
    }
  }

  ngOnDestroy() {}
}
