/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ConfiguratorResumeConfigDialogComponent } from './configurator-resume-config-dialog.component';

export const defaultConfiguratorResumeConfigDialogLayoutConfig: LayoutConfig = {
  launch: {
    CONFIGURATOR_RESUME_CONFIG: {
      inlineRoot: true,
      component: ConfiguratorResumeConfigDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
