/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    PRODUCT_IMAGE_ZOOM = 'PRODUCT_IMAGE_ZOOM',
  }
}

(LAUNCH_CALLER as any)['PRODUCT_IMAGE_ZOOM'] = 'PRODUCT_IMAGE_ZOOM';
