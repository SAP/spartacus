import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components';

@Component({
  selector: 'cx-password-visibility',
  templateUrl: './password-visibility.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordVisibilityComponent {
  protected showIcon = ICON_TYPE.EYE;
  protected hideIcon = ICON_TYPE.EYE_SLASH;

  inputElement: HTMLInputElement;
  inputType = 'password';
  action = 'showPassword';
  icon = this.showIcon;

  constructor() {}

  toggle(): void {
    if (this.inputType === 'password') {
      this.inputType = 'text';
      this.action = 'showPassword';
      this.icon = this.showIcon;
    } else {
      this.inputType = 'password';
      this.action = 'hidePassword';
      this.icon = this.hideIcon;
    }
    this.inputElement.setAttribute('type', this.inputType);
  }
}
