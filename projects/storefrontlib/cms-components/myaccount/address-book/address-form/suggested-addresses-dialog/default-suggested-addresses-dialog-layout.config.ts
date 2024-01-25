/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '../../../../../layout';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog.component';

export const defaultSuggestedAddressesDialogLayoutConfig: LayoutConfig = {
  launch: {
    SUGGESTED_ADDRESSES: {
      inlineRoot: true,
      component: SuggestedAddressDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
