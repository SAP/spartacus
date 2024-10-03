/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SiteContextEventBuilder } from './site-context-event.builder';

@NgModule({})
export class SiteContextEventModule {
  constructor(_siteContextEventBuilder: SiteContextEventBuilder) {
    // Intentional empty constructor
  }
}
