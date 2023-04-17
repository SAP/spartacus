/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { GetAddressCardContent } from './get-address-card-content.pipe';

@NgModule({
  declarations: [GetAddressCardContent],
  exports: [GetAddressCardContent],
})
export class OpfPipesModule {}
