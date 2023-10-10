/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  OpfConfigurationAdapter,
  OpfOrderAdapter,
  OpfPaymentAdapter,
  OtpAdapter,
} from '@spartacus/opf/base/core';
import { OccOrderNormalizer } from '@spartacus/order/occ';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import {
  OccOpfConfigurationAdapter,
  OccOpfOrderAdapter,
  OccOtpAdapter,
} from './adapters';
import { OccOpfPaymentAdapter } from './adapters/occ-opf.adapter';
import { defaultOccOpfConfig } from './config/default-occ-opf-config';
import { defaultOccOpfConfigurationConfig } from './config/default-occ-opf-configuration-config';
import { defaultOccOpfOrderConfig } from './config/default-occ-opf-order-config';
import { defaultOccOtpConfig } from './config/default-occ-otp-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOpfConfig),
    {
      provide: OpfPaymentAdapter,
      useClass: OccOpfPaymentAdapter,
    },
    provideDefaultConfig(defaultOccOpfOrderConfig),
    {
      provide: OpfOrderAdapter,
      useClass: OccOpfOrderAdapter,
    },
    {
      provide: ORDER_NORMALIZER,
      useExisting: OccOrderNormalizer,
      multi: true,
    },
    provideDefaultConfig(defaultOccOtpConfig),
    {
      provide: OtpAdapter,
      useClass: OccOtpAdapter,
    },
    provideDefaultConfig(defaultOccOpfConfigurationConfig),
    {
      provide: OpfConfigurationAdapter,
      useClass: OccOpfConfigurationAdapter,
    },
  ],
})
export class OpfBaseOccModule {}
