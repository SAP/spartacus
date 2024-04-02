/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CartConfig } from '@spartacus/cart/base/root';
import { provideConfig, SiteContextConfig } from '@spartacus/core';
import {
  defaultCmsContentProviders,
  layoutConfig,
  mediaConfig,
  PWAModuleConfig,
} from '@spartacus/storefront';
import { environment } from '../../environments/environment';

const defaultBaseSite = [
  'electronics-spa',
  'electronics',
  'electronics-standalone',
  'apparel-de',
  'apparel-uk',
  'apparel-uk-spa',
  'apparel-uk-standalone',
];
const baseSite = environment.epdVisualization
  ? ['electronics-epdvisualization-spa'].concat(defaultBaseSite)
  : defaultBaseSite;

@NgModule({
  providers: [
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
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
    provideConfig(<CartConfig>{
      cart: {
        selectiveCart: {
          enabled: true,
        },
      },
    }),
  ],
})
export class SpartacusB2cConfigurationModule {}
