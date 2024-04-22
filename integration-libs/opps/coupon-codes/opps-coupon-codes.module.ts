/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { oppsInterceptors } from './http-interceptors';
import { defaultOppsConfig } from '../config';

@NgModule({
  declarations: [],
  imports: [],
  providers: [...oppsInterceptors, provideDefaultConfig(defaultOppsConfig)],
})
export class OppsCouponCodesModule {}
