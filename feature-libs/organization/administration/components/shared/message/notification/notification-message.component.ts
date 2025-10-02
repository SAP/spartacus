/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { BaseMessageComponent } from '../base-message.component';
import { FocusDirective } from '../../../../../../../projects/storefrontlib/layout/a11y/keyboard-focus/focus.directive';
import { NgIf } from '@angular/common';
import { IconComponent } from '../../../../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-org-notification',
  templateUrl: './notification-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FocusDirective,
    NgIf,
    IconComponent,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class NotificationMessageComponent extends BaseMessageComponent {
  closeIcon = ICON_TYPE.CLOSE;
}
