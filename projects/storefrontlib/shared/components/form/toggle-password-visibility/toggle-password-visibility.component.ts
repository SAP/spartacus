import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components';

@Component({
  selector: 'cx-toggle-password-visibility',
  templateUrl: './toggle-password-visibility.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TogglePasswordVisibilityComponent {
  protected showState = {
    icon: ICON_TYPE.EYE_SLASH,
    inputType: 'text',
    ariaLabel: 'passwordVisibility.hidePassword',
  };
  protected hideState = {
    icon: ICON_TYPE.EYE,
    inputType: 'password',
    ariaLabel: 'passwordVisibility.showPassword',
  };

  inputElement: HTMLInputElement;
  state = this.hideState;

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
