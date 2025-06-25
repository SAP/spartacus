/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProvideLcpPresenceDirective } from './provide-lcp-context.directive';

@NgModule({
  declarations: [ProvideLcpPresenceDirective],
  exports: [ProvideLcpPresenceDirective],
})
export class ProvideLcpContextDirectiveModule {}
