/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ProductImageZoomDialogComponent } from './product-image-zoom-dialog/product-image-zoom-dialog.component';

export const defaultProductImageZoomLayoutConfig: LayoutConfig = {
  launch: {
    PRODUCT_IMAGE_ZOOM: {
      inline: true,
      component: ProductImageZoomDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
