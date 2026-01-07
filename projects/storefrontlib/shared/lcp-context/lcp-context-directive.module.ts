/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { LcpContextDirective } from './lcp-context.directive';

@NgModule({
  imports: [LcpContextDirective],
  exports: [LcpContextDirective],
})
export class LcpContextDirectiveModule {}
