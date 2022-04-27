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

  /**
   * Toggle the visibility of the text of the input field.
   */
  toggle(): void {
    if (this.inputType === 'password') {
      this.inputType = 'text';
      this.action = 'showPassword';
      this.icon = this.hideIcon;
    } else {
      this.inputType = 'password';
      this.action = 'hidePassword';
      this.icon = this.showIcon;
    }
    this.inputElement.setAttribute('type', this.inputType);
  }
}
