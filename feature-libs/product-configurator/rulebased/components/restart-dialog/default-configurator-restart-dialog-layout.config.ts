/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ConfiguratorRestartDialogComponent } from './configurator-restart-dialog.component';

export const defaultConfiguratorRestartDialogLayoutConfig: LayoutConfig = {
  launch: {
    CONFIGURATOR_RESTART_DIALOG: {
      inlineRoot: true,
      component: ConfiguratorRestartDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
