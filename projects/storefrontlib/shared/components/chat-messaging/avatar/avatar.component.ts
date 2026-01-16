/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../../cms-components/misc/icon/icon.component';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { MessageEvent } from '../messaging/messaging.model';

@Component({
  selector: 'cx-avatar',
  templateUrl: './avatar.component.html',
  imports: [NgIf, NgClass, IconComponent],
})
export class AvatarComponent {
  @Input() message: MessageEvent;
  iconTypes = ICON_TYPE;

  getInitials(author: string): string {
    return author
      .split(' ')
      .map((string) => string[0])
      .join('');
  }
}
