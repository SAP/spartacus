/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { MessageEvent } from '../messaging/messaging.model';
import { IconComponent } from '../../../../cms-components/misc/icon/icon.component';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'cx-avatar',
    templateUrl: './avatar.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgClass,
        IconComponent,
    ],
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
