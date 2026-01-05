/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { S4ServiceCheckoutComponentModule } from './components/s4-service-checkout-component.module';
import { S4ServiceCheckoutCoreModule } from './core/s4-service-checkout-core.module';
import { S4ServiceCheckoutOccModule } from './occ/s4-service-checkout-occ.module';

@NgModule({
  imports: [
    S4ServiceCheckoutComponentModule,
    S4ServiceCheckoutCoreModule,
    S4ServiceCheckoutOccModule,
  ],
})
export class S4ServiceCheckoutModule {}
