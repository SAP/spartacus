/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { NotificationMessageModule } from './notification/notification-message.module';

@NgModule({
  imports: [CommonModule, NotificationMessageModule],
  declarations: [MessageComponent],
  exports: [MessageComponent],
})
export class MessageModule {}
