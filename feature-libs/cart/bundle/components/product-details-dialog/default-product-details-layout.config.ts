/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutConfig, DIALOG_TYPE } from '@spartacus/storefront';
import { ProductDetailsDialogComponent } from './product-details-dialog.component';

export const defaultProductDetailsLayoutConfig: LayoutConfig = {
  launch: {
    PRODUCT_DETAILS_DIALOG: {
      inlineRoot: true,
      component: ProductDetailsDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
