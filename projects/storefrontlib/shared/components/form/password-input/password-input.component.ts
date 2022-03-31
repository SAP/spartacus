import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[cxPassword]',
  template: ``,
  host: {
    '[attr.type]': 'passwordType',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent {
  @Input()
  passwordType = 'password';

  changePasswordVisibility(): void {
    this.passwordType = this.isTypePassword() ? 'text' : 'password';
  }

  getPasswordIcon(): string {
    return this.isTypePassword() ? 'EYE' : 'EYE_SLASH';
  }

  private isTypePassword(): boolean {
    return this.passwordType === 'password';
  }
}
