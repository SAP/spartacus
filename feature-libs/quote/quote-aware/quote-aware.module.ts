/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { QuoteAwareComponentModule } from './component/quote-aware.component.module';

@NgModule({
  imports: [QuoteAwareComponentModule],
})
export class QuoteAwareModule {}
