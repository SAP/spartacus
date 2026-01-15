/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { OrderDocumentFlowDialogComponent } from './order-document-flow-dialog';

export const defaultOrderDocumentFlowDialogLayoutConfig: LayoutConfig = {
  launch: {
    ORDER_DOCUMENT_FLOW: {
      inlineRoot: true,
      component: OrderDocumentFlowDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
