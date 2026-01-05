/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProvideLcpPresenceDirective } from './provide-lcp-presence.directive';

@NgModule({
  declarations: [ProvideLcpPresenceDirective],
  exports: [ProvideLcpPresenceDirective],
})
export class ProvideLcpPresenceDirectiveModule {}
