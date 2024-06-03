/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { PasswordInputState } from './password-input-visibility.model';

@Component({
  selector: 'cx-password-visibility-toggle',
  templateUrl: './password-visibility-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordVisibilityToggleComponent {
  protected showState: PasswordInputState = {
    icon: ICON_TYPE.EYE_SLASH,
    inputType: 'text',
    ariaLabel: 'passwordVisibility.hidePassword',
  };
  protected hideState: PasswordInputState = {
    icon: ICON_TYPE.EYE,
    inputType: 'password',
    ariaLabel: 'passwordVisibility.showPassword',
  };

  @Input()
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
