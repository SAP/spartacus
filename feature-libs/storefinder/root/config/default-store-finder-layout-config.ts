/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutConfig } from '@commerce-storefront-toolset/storefront';

export const defaultStoreFinderLayoutConfig: LayoutConfig = {
  layoutSlots: {
    StoreFinderPageTemplate: {
      slots: ['MiddleContent', 'SideContent'],
    },
  },
};
