/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BundleTemplate } from './bundle-template.model';

declare module '@spartacus/core' {
  interface Product {
    bundleTemplates?: BundleTemplate[];
  }
}

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    PRODUCT_DETAILS_DIALOG = 'PRODUCT_DETAILS_DIALOG',
  }
}
