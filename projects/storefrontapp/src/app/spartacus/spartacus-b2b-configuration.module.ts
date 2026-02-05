/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { defaultB2BCheckoutConfig } from '@spartacus/checkout/b2b/root';
import {
  provideConfig,
  provideConfigFactory,
  SiteContextConfig,
} from '@spartacus/core';
import { defaultB2bOccConfig } from '@spartacus/setup';
import {
  defaultCmsContentProviders,
  layoutConfigFactory,
  mediaConfig,
  PWAModuleConfig,
} from '@spartacus/storefront';
import { environment } from '../../environments/environment';

let baseSite = ['powertools-spa', 'powertools-standalone'];

if (environment.epdVisualization) {
  baseSite.unshift('powertools-epdvisualization-spa');
}

@NgModule({
  // Note: Our internal script in the `ec-automate-pipelines` repo prepends a new config chunk to this array below.
  providers: [
    // b2c
    provideConfigFactory(layoutConfigFactory),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    // b2b
    provideConfig(defaultB2bOccConfig),
    provideConfig(defaultB2BCheckoutConfig),
    // Note: The next config chunk is edited by our internal script in the `ec-automate-pipelines` repo. Don't move it to other file.
    provideConfig(<SiteContextConfig>{
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: baseSite,
      },
    }),
    // Note: The next config chunk is edited by our internal script in the `ec-automate-pipelines` repo. Don't move it to other file.
    provideConfig(<PWAModuleConfig>{
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),
  ],
})
export class SpartacusB2bConfigurationModule {}
