/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { QuoteListEventListener } from './quote-list-event.listener';

@NgModule({})
export class QuoteEventModule {
  constructor(_quoteListEventListener: QuoteListEventListener) {}
}
