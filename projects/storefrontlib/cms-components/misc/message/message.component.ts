/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
@Component({
  selector: 'cx-message',
  templateUrl: './message.component.html',
})
export class MessageComponent {
  @Input()
  text: string;

  @Input()
  actionButtonText: string;

  @Input()
  actionButtonMessage: string;

  @Input()
  accordionText: string;

  @Input()
  showBody = false;

  @Input()
  isVisibleCloseButton = true;

  @Input()
  type: GlobalMessageType;

  @Output()
  closeMessage: EventEmitter<void> = new EventEmitter();

  @Output()
  buttonAction: EventEmitter<void> = new EventEmitter();

  iconTypes = ICON_TYPE;

  constructor() {
    // Intentional empty constructor
  }

  get getCssClassesForMessage(): Record<string, boolean> {
    return {
      'cx-message-success':
        this.type === GlobalMessageType.MSG_TYPE_CONFIRMATION,
      'cx-message-info': this.type === GlobalMessageType.MSG_TYPE_INFO,
      'cx-message-warning': this.type === GlobalMessageType.MSG_TYPE_WARNING,
      'cx-message-danger': this.type === GlobalMessageType.MSG_TYPE_ERROR,
    };
  }

  get getIconType(): ICON_TYPE {
    switch (this.type) {
      case GlobalMessageType.MSG_TYPE_WARNING:
        return ICON_TYPE.WARNING;
      case GlobalMessageType.MSG_TYPE_ERROR:
        return ICON_TYPE.ERROR;
      case GlobalMessageType.MSG_TYPE_INFO:
        return ICON_TYPE.INFO;
      default:
        return ICON_TYPE.SUCCESS;
    }
  }
}
