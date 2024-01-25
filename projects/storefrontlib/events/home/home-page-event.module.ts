/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HomePageEventBuilder } from './home-page-event.builder';

@NgModule({})
export class HomePageEventModule {
  constructor(_homePageEventBuilder: HomePageEventBuilder) {
    // Intentional empty constructor
  }
}
