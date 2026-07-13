/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { FeatureToggles } from '@spartacus/core';
import {
  LayoutConfig,
  SlotConfig,
  SlotGroup,
} from '../../layout/config/layout-config';

/**
 * The layout configuration is used to define the overall layout of the storefront.
 * The configuration includes the following aspects:
 * - breakpoint layout (AKA screen layout)
 * - Page sections slot configuration (i.e. header vs footer)
 * - page template slot configuration (i.e. landing page template vs PDP page template)
 * - deferred loading configuration
 *
 * The page slot configurations is directly related to the data in the backend. If you use the
 * Spartacus sample-data, you will have an aligned setup. However, if you introduce custom page
 * templates and/or slots, you most likely need to further adjust or replace this configuration.
 *
 *@deprecated Use `layoutConfigFactory` and `provideConfigFactory(layoutConfigFactory)` instead.
 */
export const layoutConfig: LayoutConfig = {
  // deferredLoading: {
  //   strategy: DeferLoadingStrategy.DEFER,
  //   intersectionMargin: '50px',
  // },
  layoutSlots: {
    header: {
      lg: {
        slots: [
          'PreHeader',
          'SiteContext',
          'SiteLinks',
          'SiteLogo',
          'SearchBox',
          'SiteLogin',
          'MiniCart',
          'NavigationBar',
        ],
      },
      slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
    },
    navigation: {
      lg: { slots: [] },
      slots: ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
    },
    footer: {
      slots: ['Footer'],
    },
    LandingPage2Template: {
      pageFold: 'Section2B',
      slots: [
        'Section1',
        'Section2A',
        'Section2B',
        'Section2C',
        'Section3',
        'Section4',
        'Section5',
      ],
    },
    ContentPage1Template: {
      slots: ['Section2A', 'Section2B'],
    },
    CategoryPageTemplate: {
      pageFold: 'Section2',
      slots: ['Section1', 'Section2', 'Section3'],
    },
    ProductListPageTemplate: {
      slots: ['ProductLeftRefinements', 'ProductListSlot'],
    },
    ProductGridPageTemplate: {
      slots: ['ProductLeftRefinements', 'ProductGridSlot'],
    },
    SearchResultsListPageTemplate: {
      slots: [
        'Section2',
        'ProductLeftRefinements',
        'SearchResultsListSlot',
        'Section4',
      ],
    },
    SearchResultsGridPageTemplate: {
      slots: [
        'Section2',
        'ProductLeftRefinements',
        'SearchResultsGridSlot',
        'Section4',
      ],
    },
    ProductDetailsPageTemplate: {
      lg: {
        pageFold: 'UpSelling',
      },
      pageFold: 'Summary',
      slots: [
        'Summary',
        'UpSelling',
        'CrossSelling',
        'Tabs',
        'PlaceholderContentSlot',
      ],
    },
    CartPageTemplate: {
      slots: ['TopContent', 'CenterRightContentSlot', 'EmptyCartMiddleContent'],
    },
    AccountPageTemplate: {
      slots: ['BodyContent', 'SideContent'],
    },
    LoginPageTemplate: {
      slots: ['LeftContentSlot', 'RightContentSlot'],
    },
    ErrorPageTemplate: {
      slots: ['TopContent', 'MiddleContent', 'BottomContent'],
    },
    OrderConfirmationPageTemplate: {
      slots: ['BodyContent', 'SideContent'],
    },
    MultiStepCheckoutSummaryPageTemplate: {
      slots: ['TopContent', 'BodyContent', 'SideContent', 'BottomContent'],
    },
    CheckoutLoginPageTemplate: {
      slots: ['RightContentSlot'],
    },
    MyAccountViewPageTemplate: {
      slots: ['LeftContentSlot', 'RightContentSlot'],
    },
  },
};

function applyUnifiedHeaderSlots(config: LayoutConfig): void {
  if (
    config.layoutSlots &&
    config.layoutSlots.header &&
    'slots' in config.layoutSlots.header
  ) {
    if ('lg' in config.layoutSlots.header) {
      delete config.layoutSlots.header.lg;
    }
    config.layoutSlots.header.slots = [
      'PreHeader',
      'SiteContext',
      'SiteLinks',
      'SiteLogo',
      'SearchBox',
      'SiteLogin',
      'MiniCart',
      'NavigationBar',
    ];
  }
}

function applyWithoutPageFold(config: LayoutConfig): void {
  const homepageConfig =
    (config?.layoutSlots?.LandingPage2Template as SlotConfig) ?? {};
  delete homepageConfig.pageFold;

  const categoryPageConfig =
    (config?.layoutSlots?.CategoryPageTemplate as SlotConfig) ?? {};
  delete categoryPageConfig.pageFold;

  const productDetailsPageConfig =
    (config?.layoutSlots?.ProductDetailsPageTemplate as SlotConfig) ?? {};
  delete productDetailsPageConfig.pageFold;
  delete ((productDetailsPageConfig as SlotGroup).lg ?? {}).pageFold;
}

/**
 * Factory for layout configuration.
 */
export function layoutConfigFactory(): LayoutConfig {
  const config: LayoutConfig = JSON.parse(JSON.stringify(layoutConfig));
  const featureToggles = inject(FeatureToggles);

  applyUnifiedHeaderSlots(config);

  if (featureToggles.defaultLayoutConfigWithoutPageFold) {
    applyWithoutPageFold(config);
  }

  return config;
}
