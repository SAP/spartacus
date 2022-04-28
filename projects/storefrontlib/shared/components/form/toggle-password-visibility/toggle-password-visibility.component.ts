import { TogglePasswordState } from './toggle-password-visibility.model';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components';

@Component({
  selector: 'cx-toggle-password-visibility',
  templateUrl: './toggle-password-visibility.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TogglePasswordVisibilityComponent {
  protected showState: TogglePasswordState = {
    icon: ICON_TYPE.EYE_SLASH,
    inputType: 'text',
    ariaLabel: 'passwordVisibility.hidePassword',
  };
  protected hideState: TogglePasswordState = {
    icon: ICON_TYPE.EYE,
    inputType: 'password',
    ariaLabel: 'passwordVisibility.showPassword',
  };

  inputElement: HTMLInputElement;
  state = this.hideState;

  /**
   * Toggle the visibility of the text of the input field.
   */
  toggle(): void {
    this.state =
      this.state === this.hideState ? this.showState : this.hideState;
    this.inputElement.setAttribute('type', this.state.inputType);
  }
}
