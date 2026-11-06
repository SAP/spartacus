/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProvideLcpPresenceDirective } from './provide-lcp-presence.directive';

@NgModule({
  imports: [ProvideLcpPresenceDirective],
  exports: [ProvideLcpPresenceDirective],
})
export class ProvideLcpPresenceDirectiveModule {}
