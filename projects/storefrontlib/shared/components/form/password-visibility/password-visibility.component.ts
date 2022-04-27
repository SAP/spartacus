import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components';

@Component({
  selector: 'cx-password-visibility',
  templateUrl: './password-visibility.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordVisibilityComponent {
  protected showState = {
    icon: ICON_TYPE.EYE,
    inputType: 'text',
    ariaLabel: 'passwordVisibility.showPassword',
  };
  protected hideState = {
    icon: ICON_TYPE.EYE_SLASH,
    inputType: 'password',
    ariaLabel: 'passwordVisibility.hidePassword',
  };

  inputElement: HTMLInputElement;
  state = this.showState;

  constructor() {}

  /**
   * Toggle the visibility of the text of the input field.
   */
  toggle(): void {
    if (this.state === this.hideState) {
      this.state = this.showState;
    } else {
      this.state = this.hideState;
    }
    this.inputElement.setAttribute('type', this.state.inputType);
  }
}
