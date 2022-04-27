import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-password-visibility',
  templateUrl: './password-visibility.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordVisibilityComponent {
  inputType: string = 'password';
  elementRef: HTMLInputElement;

  constructor() {}

  changePasswordVisibility(): void {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
    this.elementRef.setAttribute('type', this.inputType);
  }

  getPasswordIcon(): string {
    return this.inputType === 'password' ? 'EYE' : 'EYE_SLASH';
  }
}
