/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  CDC_USER_PREFERENCE_SERIALIZER,
  CdcUserPreferenceSerializer,
  CdcUserConsentConnector,
} from './connector/consent';
import { CdcAuthModule } from '../auth/cdc-auth.module';
import { CdcAuthService } from '../auth/facade/cdc-auth.service';
import { effects } from './effects/index';
import { CdcConsentsLocalStorageService } from './connector/consent/cdc-consents-local-storage.service';

@NgModule({
  imports: [CommonModule, CdcAuthModule, EffectsModule.forFeature(effects)],
  providers: [
    CdcUserConsentConnector,
    CdcConsentsLocalStorageService,
    CdcAuthService,
    {
      provide: CDC_USER_PREFERENCE_SERIALIZER,
      useExisting: CdcUserPreferenceSerializer,
      multi: true,
    },
  ],
})
export class CdcStoreModule {}
