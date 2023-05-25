/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { Customer360Connector } from './connectors';
import { facadeProviders } from './facade/facade-providers';
import { StoreFinderModule } from '@spartacus/storefinder';

@NgModule({
  imports: [StoreFinderModule],
  providers: [Customer360Connector, ...facadeProviders],
})
export class Customer360CoreModule {}
