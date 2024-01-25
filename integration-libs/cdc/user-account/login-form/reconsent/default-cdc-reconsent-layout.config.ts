/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CdcReconsentComponent } from './cdc-reconsent.component';

export const defaultCdcReconsentLayoutConfig: LayoutConfig = {
  launch: {
    CDC_RECONSENT: {
      inlineRoot: true,
      component: CdcReconsentComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
