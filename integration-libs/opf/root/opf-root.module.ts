/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOPFCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfConfig } from './config/default-opf-config';

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig(defaultOpfConfig),
    provideDefaultConfig(defaultOPFCheckoutConfig),
    // TODO: (OPF) uncomment once proper type and routing is set up
    // provideDefaultConfig(defaultOPFRoutingConfig),
  ],
})
export class OpfRootModule {}
