/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';
import { OpfTokenisationConnector } from './connectors';

@NgModule({
  imports: [],
  providers: [...facadeProviders, OpfTokenisationConnector],
})
export class OpfTokenisationCoreModule {}
