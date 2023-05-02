/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import {
  ConsentOutlets,
  GenericLinkModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { CdcSiteConsentComponent } from './cdc-site-consent.component';

@NgModule({
  imports: [CommonModule, I18nModule, GenericLinkModule],
  providers: [
    provideOutlet({
      id: ConsentOutlets.SHOW_DOCUMENT,
      position: OutletPosition.REPLACE,
      component: CdcSiteConsentComponent,
    }),
  ],
  declarations: [CdcSiteConsentComponent],
  exports: [CdcSiteConsentComponent],
})
export class CdcSiteConsentModule {}
