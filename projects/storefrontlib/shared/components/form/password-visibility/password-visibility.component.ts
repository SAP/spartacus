import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Component({
  selector: 'cx-password-visibility',
  templateUrl: './password-visibility.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordVisibilityComponent implements OnInit {
  passwordType: string = 'password';
  input: HTMLElement | null;

  constructor(protected winRef: WindowRef) {}

  ngOnInit(): void {
    this.input = this.winRef.document.querySelector(
      'div.cx-password-input > input'
    );
  }

  changePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.input?.setAttribute('type', this.passwordType);
  }

  getPasswordIcon(): string {
    return this.passwordType === 'password' ? 'EYE' : 'EYE_SLASH';
  }
}
