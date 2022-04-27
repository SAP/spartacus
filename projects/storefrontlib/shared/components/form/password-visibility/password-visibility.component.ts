import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components';

@Component({
  selector: 'cx-password-visibility',
  templateUrl: './password-visibility.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordVisibilityComponent {
  inputElement: HTMLInputElement;
  inputType: string = 'password';
  icon: string;
  action: string;

  protected showIcon = ICON_TYPE.EYE;
  protected hideIcon = ICON_TYPE.EYE_SLASH;

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
