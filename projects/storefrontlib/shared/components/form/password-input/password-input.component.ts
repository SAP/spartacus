import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cx-password-input',
  templateUrl: './password-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent {
  passwordType: string = 'password';

  @Input() public form: FormGroup;

  @Input()
  placeholder: string;

  @Input()
  required: boolean;

  @Input()
  formCtrlName: string;

  constructor() {}

  changePasswordVisibility(): void {
    console.log(this.formCtrlName);
    this.passwordType = this.isTypePassword() ? 'text' : 'password';
  }

  getPasswordIcon(): string {
    return this.isTypePassword() ? 'EYE' : 'EYE_SLASH';
  }

  protected isTypePassword(): boolean {
    return this.passwordType === 'password';
  }
}
