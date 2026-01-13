/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { PunchoutConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';
import { PunchoutAuthService } from './services';

@NgModule({
  imports: [],
  providers: [...facadeProviders, PunchoutConnector, PunchoutAuthService],
})
export class PunchoutCoreModule {}
