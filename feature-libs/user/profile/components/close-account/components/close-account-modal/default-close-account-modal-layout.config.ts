/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CloseAccountModalComponent } from './close-account-modal.component';

export const defaultCloseDialogModalLayoutConfig: LayoutConfig = {
  launch: {
    CLOSE_ACCOUNT: {
      inline: true,
      component: CloseAccountModalComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
