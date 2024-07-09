/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DIALOG_TYPE,
  LAUNCH_CALLER,
  LayoutConfig,
} from '@spartacus/storefront';
import { VerificationTokenDialogComponent } from './verification-token-dialog.component';

export const defaultVerificationTokenLayoutConfig: LayoutConfig = {
  launch: {
    [LAUNCH_CALLER.ACCOUNT_VERIFICATION_TOKEN]: {
      inlineRoot: true,
      component: VerificationTokenDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
