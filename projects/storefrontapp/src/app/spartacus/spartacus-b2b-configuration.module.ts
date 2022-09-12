/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { defaultB2BCheckoutConfig } from '@commerce-storefront-toolset/checkout/b2b/root';
import { provideConfig, SiteContextConfig } from '@commerce-storefront-toolset/core';
import { defaultB2bOccConfig } from '@commerce-storefront-toolset/setup';
import {
  defaultCmsContentProviders,
  layoutConfig,
  mediaConfig,
  PWAModuleConfig,
} from '@commerce-storefront-toolset/storefront';
import { environment } from '../../environments/environment';

const baseSite = environment.epdVisualization
  ? ['powertools-epdvisualization-spa', 'powertools-spa']
  : ['powertools-spa'];

@NgModule({
  providers: [
    // b2c
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    // b2b
    provideConfig(defaultB2bOccConfig),
    provideConfig(defaultB2BCheckoutConfig),
    provideConfig(<SiteContextConfig>{
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: baseSite,
      },
    }),
    provideConfig(<PWAModuleConfig>{
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),
  ],
})
export class SpartacusB2bConfigurationModule {}
