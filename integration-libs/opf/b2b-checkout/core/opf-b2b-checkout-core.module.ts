/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [...facadeProviders],
})
export class OpfB2bCheckoutCoreModule {}
