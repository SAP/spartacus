/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CdcUserTokenEffects } from './effects/cdc-user-token.effect';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([CdcUserTokenEffects])],
})
export class CdcAuthStoreModule {}
