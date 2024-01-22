/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UserConsentAdapter } from '@spartacus/core';
import { ConsentManagementComponentService } from '@spartacus/storefront';
import { CdcUserConsentAdapter } from './cdc-user-consent.adapter';
import { CdcUserPreferenceSerializer } from './converters/cdc-user-preference.serializer';
import { CDC_USER_PREFERENCE_SERIALIZER } from './converters/converter';
import { CdcConsentManagementComponentService } from './services/cdc-consent-management-component.service';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    { provide: UserConsentAdapter, useClass: CdcUserConsentAdapter },
    {
      provide: ConsentManagementComponentService,
      useClass: CdcConsentManagementComponentService,
    },
    {
      provide: CDC_USER_PREFERENCE_SERIALIZER,
      useExisting: CdcUserPreferenceSerializer,
      multi: true,
    },
  ],
})
export class CdcConsentManagementModule {}
