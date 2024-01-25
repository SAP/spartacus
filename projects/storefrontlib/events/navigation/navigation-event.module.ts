/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { NavigationEventBuilder } from './navigation-event.builder';

@NgModule({})
export class NavigationEventModule {
  constructor(_navigationEventBuilder: NavigationEventBuilder) {
    // Intentional empty constructor
  }
}
