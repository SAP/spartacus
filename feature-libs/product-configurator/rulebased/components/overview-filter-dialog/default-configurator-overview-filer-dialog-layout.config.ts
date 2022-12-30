/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ConfiguratorOverviewFilterDialogComponent } from './configurator-overview-filter-dialog.component';

export const defaultConfiguratorOverviewFilterDialogLayoutConfig: LayoutConfig =
  {
    launch: {
      CONFIGURATOR_OV_FILTER: {
        inlineRoot: true,
        component: ConfiguratorOverviewFilterDialogComponent,
        dialogType: DIALOG_TYPE.DIALOG,
      },
    },
  };
