/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutConfig } from '@spartacus/storefront';

export const defaultStoreFinderLayoutConfig: LayoutConfig = {
  layoutSlots: {
    StoreFinderPageTemplate: {
      slots: ['MiddleContent', 'SideContent'],
    },
  },
};
