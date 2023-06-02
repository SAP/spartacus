/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { OPF_FEATURE } from './opf-state';
import { reducerProvider, reducerToken } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(OPF_FEATURE, reducerToken),
  ],
  providers: [reducerProvider],
})
export class OpfStoreModule {}
