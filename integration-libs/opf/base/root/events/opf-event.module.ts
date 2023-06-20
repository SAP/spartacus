/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfEventListenerService } from './opf-event.listener';

@NgModule({})
export class OpfEventModule {
  constructor(_opfEventListenerService: OpfEventListenerService) {
    // Intentional empty constructor
  }
}
