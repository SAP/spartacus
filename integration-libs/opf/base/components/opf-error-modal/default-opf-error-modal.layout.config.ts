/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { OpfErrorModalComponent } from './opf-error-modal.component';

export const defaultOpfErrorModalLayoutConfig: LayoutConfig = {
  launch: {
    OPF_ERROR: {
      inline: true,
      component: OpfErrorModalComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDROP,
    },
  },
};
