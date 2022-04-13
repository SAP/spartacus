import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { FormConfig } from '../../../../shared/config/form-config';

@Component({
  selector: 'cx-password-visibility',
  templateUrl: './password-visibility.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordVisibilityComponent implements OnInit {
  passwordType: string = 'password';
  input: HTMLElement | null;
  enabled = this.config.form?.passwordVisibility;

  @Input()
  formCtrlName: string;

  constructor(protected winRef: WindowRef, protected config: FormConfig) {}

  ngOnInit(): void {
    this.input = this.winRef.document.querySelector(
      `[formcontrolname="${this.formCtrlName}"]`
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
