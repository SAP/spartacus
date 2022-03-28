import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormComponentService } from './login-form-component.service';
import { PasswordInputComponent } from '../../../../../projects/storefrontlib/shared';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @HostBinding('class.user-form') style = true;

  @ViewChild('password')
  passwordInput: PasswordInputComponent;

  form: FormGroup = this.service.form;

  isUpdating$ = this.service.isUpdating$;

  constructor(protected service: LoginFormComponentService) {}

  onSubmit(): void {
    this.service.login();
  }

  getPasswordIcon(): string {
    return this.passwordInput ? this.passwordInput.getPasswordIcon() : 'EYE';
  }

  changePasswordVisibility(): void {
    if (this.passwordInput) {
      this.passwordInput.changePasswordVisibility();
    }
  }
}
