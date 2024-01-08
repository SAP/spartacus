/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { StoreFinderModule } from '@spartacus/storefinder';
import { AsmCustomer360Connector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [StoreFinderModule],
  providers: [AsmCustomer360Connector, ...facadeProviders],
})
export class AsmCustomer360CoreModule {}
