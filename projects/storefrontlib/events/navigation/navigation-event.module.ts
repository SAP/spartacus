/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
