/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfPaymentConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [],
  providers: [...facadeProviders, OpfPaymentConnector],
})
export class OpfPaymentCoreModule {}
