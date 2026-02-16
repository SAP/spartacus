/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FeatureConfigService, TranslatePipe } from '@spartacus/core';
import {
  FocusDirective,
  ICON_TYPE,
  IconComponent,
} from '@spartacus/storefront';
import { BaseMessageComponent } from '../base-message.component';

@Component({
  selector: 'cx-org-notification',
  templateUrl: './notification-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FocusDirective, NgIf, IconComponent, TranslatePipe],
})
export class NotificationMessageComponent extends BaseMessageComponent {
  closeIcon = ICON_TYPE.CLOSE;

featureConfigService = inject(FeatureConfigService);
}
