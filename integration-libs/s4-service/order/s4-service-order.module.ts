/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { S4ServiceComponentsModule } from './components/s4-service-components.module';
import { S4ServiceOrderCoreModule } from './core/s4-service-order-core.module';
import { S4ServiceOrderOccModule } from './occ/s4-service-order-occ.module';

@NgModule({
  imports: [
    S4ServiceComponentsModule,
    S4ServiceOrderCoreModule,
    S4ServiceOrderOccModule,
  ],
})
export class S4ServiceOrderModule {}
