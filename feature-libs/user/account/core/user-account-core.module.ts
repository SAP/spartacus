/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UserAccountConnector } from './connectors/index';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [UserAccountConnector, ...facadeProviders],
})
export class UserAccountCoreModule {}
