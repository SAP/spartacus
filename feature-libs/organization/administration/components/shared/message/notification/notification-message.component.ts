/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE, KeyboardFocusModule, IconModule } from '@spartacus/storefront';
import { BaseMessageComponent } from '../base-message.component';
import { I18nModule } from '@spartacus/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'cx-org-notification',
    templateUrl: './notification-message.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        KeyboardFocusModule,
        NgIf,
        IconModule,
        I18nModule,
    ],
})
export class NotificationMessageComponent extends BaseMessageComponent {
  closeIcon = ICON_TYPE.CLOSE;
}
