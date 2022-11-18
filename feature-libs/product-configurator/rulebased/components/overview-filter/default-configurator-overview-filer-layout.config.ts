/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ConfiguratorOverviewFilterComponent } from './configurator-overview-filter.component';

export const defaultConfiguratorOverviewFilterLayoutConfig: LayoutConfig = {
  launch: {
    CONFIGURATOR_OV_FILTER: {
      inlineRoot: true,
      component: ConfiguratorOverviewFilterComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
