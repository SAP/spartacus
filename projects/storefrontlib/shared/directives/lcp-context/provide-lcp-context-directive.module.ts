/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProvideLcpContextDirective } from './provide-lcp-context.directive';

@NgModule({
  declarations: [ProvideLcpContextDirective],
  exports: [ProvideLcpContextDirective],
})
export class ProvideLcpContextDirectiveModule {}
