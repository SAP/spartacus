/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CdcAuthModule } from '../auth/cdc-auth.module';
import { CdcAuthService } from '../auth/facade/cdc-auth.service';
import { effects } from './effects/index';

@NgModule({
  imports: [CommonModule, CdcAuthModule, EffectsModule.forFeature(effects)],
  providers: [CdcAuthService],
})
export class CdcStoreModule {}
