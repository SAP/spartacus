import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { PasswordInputComponent } from '../../../../../projects/storefrontlib/shared';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  host: { class: 'user-form' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePasswordComponent {
  @ViewChild('passwordOld')
  passwordOldInput: PasswordInputComponent;

  @ViewChild('passwordNew')
  passwordNewInput: PasswordInputComponent;

  @ViewChild('passwordNewConfirm')
  passwordNewConfirmInput: PasswordInputComponent;

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;

  constructor(protected service: UpdatePasswordComponentService) {}

  onSubmit(): void {
    this.service.updatePassword();
  }
  getPasswordIcon(passwordInput: PasswordInputComponent): string {
    return passwordInput ? passwordInput.getPasswordIcon() : 'EYE';
  }

  changePasswordVisibility(passwordInput: PasswordInputComponent): void {
    if (passwordInput) {
      passwordInput.changePasswordVisibility();
    }
  }
}
