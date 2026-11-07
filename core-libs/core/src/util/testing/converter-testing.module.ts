/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConverterService } from '../converter.service';
import { MockConverterService } from './mock-converter.service';

/** Provides a default {@link MockConverterService} for {@link ConverterService}. */
@NgModule({
  providers: [{ provide: ConverterService, useClass: MockConverterService }],
})
export class ConverterTestingModule {}
