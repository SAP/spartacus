/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nModule, UserConsentAdapter } from '@spartacus/core';
import { CdcUserPreferenceSerializer } from './converters/cdc-user-preference.serializer';
import { CommonModule } from '@angular/common';
import { CdcConsentManagementService } from './services/cdc-consent-management.service';
import { ConsentManagementService } from '@spartacus/storefront';
import { CDC_USER_PREFERENCE_SERIALIZER } from './converters/converter';
import { CdcUserConsentAdapter } from './cdc-user-consent.adapter';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    { provide: UserConsentAdapter, useClass: CdcUserConsentAdapter },
    {
      provide: ConsentManagementService,
      useClass: CdcConsentManagementService,
    },
    {
      provide: CDC_USER_PREFERENCE_SERIALIZER,
      useExisting: CdcUserPreferenceSerializer,
      multi: true,
    },
  ],
})
export class CdcConsentManagementModule {}
