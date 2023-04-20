/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AnonymousConsentTemplatesAdapter, I18nModule, UserConsentAdapter } from '@spartacus/core';
import { CdcSiteConsentNormalizer } from './converters/cdc-site-consent.normalizer';
import { CDCSiteConsentAdapter } from './cdc-site-consent.adapter';
import { CDC_SITE_CONSENT_NORMALIZER, CDC_USER_PREFERENCE_SERIALIZER } from './converters/cdc-site-consent.converters';
import { CdcUserPreferenceSerializer } from './converters/cdc-user-preference.serializer';
import { CdcSiteConsentComponent } from './cdc-site-consent.component';
import { ConsentOutlets,
  GenericLinkModule,
  OutletPosition, provideOutlet } from '@spartacus/storefront';
import { CommonModule } from '@angular/common';


@NgModule({
  imports:[CommonModule, GenericLinkModule, I18nModule],
  declarations:[CdcSiteConsentComponent],
  exports:[CdcSiteConsentComponent],
  providers: [
    { provide: UserConsentAdapter, useClass: CDCSiteConsentAdapter },
    { provide: AnonymousConsentTemplatesAdapter, useClass: CDCSiteConsentAdapter },
    {
      provide: CDC_SITE_CONSENT_NORMALIZER,
      useExisting: CdcSiteConsentNormalizer,
      multi: true,
    },
    {
      provide: CDC_USER_PREFERENCE_SERIALIZER,
      useExisting: CdcUserPreferenceSerializer,
      multi: true,
    },
    provideOutlet({
      id: ConsentOutlets.SHOW_DOCUMENT,
      position: OutletPosition.REPLACE,
      component: CdcSiteConsentComponent,
    }),
  ],
})
export class CDCConsentModule {}
