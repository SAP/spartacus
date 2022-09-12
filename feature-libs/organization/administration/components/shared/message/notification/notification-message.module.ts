/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@commerce-storefront-toolset/core';
import { IconModule, KeyboardFocusModule } from '@commerce-storefront-toolset/storefront';
import { NotificationMessageComponent } from './notification-message.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
  declarations: [NotificationMessageComponent],
})
export class NotificationMessageModule {}
