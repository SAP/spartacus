/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { S4ServiceComponentsModule } from './components/s4-service-components.module';
import { S4ServiceCoreModule } from './core/s4-service-core.module';
import { S4ServiceOccModule } from './occ/s4-service-occ.module';
import { S4ServiceOrderModule } from './order/s4-service-order.module';

@NgModule({
  imports: [S4ServiceComponentsModule, S4ServiceCoreModule, S4ServiceOccModule, S4ServiceOrderModule],
})
export class S4ServiceModule {}
