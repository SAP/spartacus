/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfUiEventListener } from './opf-ui-events.listener';

@NgModule({})
export class OpfEventModule {
  constructor(_opfUiEventListener: OpfUiEventListener) {
    // Intentional empty constructor
  }
}
