/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfBaseConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [],
  providers: [...facadeProviders, OpfBaseConnector],
})
export class OpfBaseCoreModule {}
