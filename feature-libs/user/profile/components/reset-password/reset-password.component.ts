import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResetPasswordComponentService } from './reset-password-component.service';
import { PasswordInputComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-reset-password',
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class ResetPasswordComponent {
  @ViewChild('password')
  passwordInput: PasswordInputComponent;

  @ViewChild('passwordConf')
  passwordConfInput: PasswordInputComponent;

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;

  token$: Observable<string> = this.service.resetToken$;

  constructor(protected service: ResetPasswordComponentService) {}

  onSubmit(token: string) {
    this.service.resetPassword(token);
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
