/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SubscriptionActionsModalComponent } from './subscription-actions-modal.component';
import { provideDefaultConfig } from '@spartacus/core';
import { subscriptionActionsPopupConfig } from './subscription-actions-popup.config';

@NgModule({
  imports: [SubscriptionActionsModalComponent],
  exports: [SubscriptionActionsModalComponent],
  providers: [provideDefaultConfig(subscriptionActionsPopupConfig)],
})
export class SubscriptionActionsModalModule {}
