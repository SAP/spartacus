/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  OpfCheckoutConnector,
  OpfOrderConnector,
  OtpConnector,
} from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [
    ...facadeProviders,
    OpfCheckoutConnector,
    OtpConnector,
    OpfOrderConnector,
  ],
})
export class OpfCoreModule {}
