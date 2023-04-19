/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UserConsentAdapter } from '@spartacus/core';
import { CdcSiteConsentNormalizer } from './cdc-site-consent.normalizer';
import { CDCSiteConsentAdapter } from './cdc-site-consent.adapter';
import { CDC_SITE_CONSENT_NORMALIZER, CDC_SITE_CONSENT_SERIALIZER } from './cdc-site-consent.converters';
import { CdcSiteConsentSerializer } from './cdc-site-consent.serializer';


@NgModule({
  providers: [{ provide: UserConsentAdapter, useClass: CDCSiteConsentAdapter },
    {
      provide: CDC_SITE_CONSENT_NORMALIZER,
      useExisting: CdcSiteConsentNormalizer,
      multi: true,
    },
    {
      provide: CDC_SITE_CONSENT_SERIALIZER,
      useExisting: CdcSiteConsentSerializer,
      multi: true,
    },
  ],
})
export class CDCConsentModule {}
