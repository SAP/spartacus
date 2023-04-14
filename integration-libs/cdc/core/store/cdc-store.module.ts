/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CdcConsentDetailsNormalizer } from 'integration-libs/cdc/components/consent-management/cdc-site-consent-normalizer';
import { CDC_CONSENT_DETAILS_NORMALIZER } from 'integration-libs/cdc/components/consent-management/cdc-site-consent.converters';
import { CdcAuthModule } from '../auth/cdc-auth.module';
import { CdcAuthService } from '../auth/facade/cdc-auth.service';
import { effects } from './effects/index';

@NgModule({
  imports: [CommonModule, CdcAuthModule, EffectsModule.forFeature(effects)],
  providers: [
    CdcAuthService,
    {
      provide: CDC_CONSENT_DETAILS_NORMALIZER,
      useExisting: CdcConsentDetailsNormalizer,
      multi: true,
    },
  ],
})
export class CdcStoreModule {}
