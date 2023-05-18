/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfigValidator, provideDefaultConfig } from '@spartacus/core';
import { defaultOPFCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfConfig } from './config/default-opf-config';
import { opfConfidValidator } from './config/opf-config-validator';
import { OpfEventModule } from './events/opf-event.module';

@NgModule({
  imports: [OpfEventModule],
  providers: [
    provideDefaultConfig(defaultOpfConfig),
    provideDefaultConfig(defaultOPFCheckoutConfig),
    provideConfigValidator(opfConfidValidator),
  ],
})
export class OpfCheckoutRootModule {}
