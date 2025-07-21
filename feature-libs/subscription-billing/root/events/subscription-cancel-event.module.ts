/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CancelPopupEventListener } from './cancel-popup-event.listener';

@NgModule({})
export class SubscriptionCancelEventModule {
  constructor(
    _cancelPopupEvent: CancelPopupEventListener
  ) {
    // Intentional empty constructor
  }
}
