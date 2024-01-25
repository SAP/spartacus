/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SavedCartEventBuilder } from './saved-cart-event.builder';

@NgModule({})
export class SavedCartEventsModule {
  constructor(_savedCartEventBuilder: SavedCartEventBuilder) {
    // Intentional empty constructor
  }
}
