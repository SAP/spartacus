/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  OpfOrderConnector,
  OpfPaymentConnector,
  OtpConnector,
} from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [],
  providers: [
    ...facadeProviders,
    OpfPaymentConnector,
    OpfOrderConnector,
    OtpConnector,
  ],
})
export class OpfBaseCoreModule {}
