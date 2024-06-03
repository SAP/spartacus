/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UserProfileConnector } from './connectors/user-profile.connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [UserProfileConnector, ...facadeProviders],
})
export class UserProfileCoreModule {}
