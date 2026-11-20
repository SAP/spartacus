/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  output,
  input,
  viewChild,
} from '@angular/core';
import { GlobalMessageType, TranslatePipe } from '@spartacus/core';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { AtMessageDirective } from '../../../shared/components/assistive-technology-message/assistive-technology-message.directive';
import { IconComponent } from '../icon/icon.component';
@Component({
  selector: 'cx-message',
  templateUrl: './message.component.html',
  imports: [NgClass, IconComponent, AtMessageDirective, TranslatePipe],
})
export class MessageComponent implements AfterViewInit {
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  text: string;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  actionButtonText: string;

  readonly actionButtonMessage = input<string>();

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  accordionText: string;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  showBody = false;

  readonly isVisibleCloseButton = input(true);

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  type: GlobalMessageType;

  readonly closeMessage = output<void>();

  readonly buttonAction = output<void>();

  iconTypes = ICON_TYPE;

  readonly messageContainer = viewChild<ElementRef>('messageContainer');

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

  ngAfterViewInit(): void {
    if (this.accordionText || this.actionButtonText) {
      this.messageContainer()?.nativeElement.focus();
    }
  }
}
