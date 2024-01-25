/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdcEventBuilder } from './cdc-event.builder';

@NgModule({})
export class CdcEventModule {
  constructor(_cdcEventBuilder: CdcEventBuilder) {
    // Intentional empty constructor
  }
}
