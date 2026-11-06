/*
 * Copyright (C) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { DateRangeModalComponent } from './date-range-modal.component';

export const dateRangeModalConfig: LayoutConfig = {
  launch: {
    DATE_RANGE_MODAL: {
      inlineRoot: true,
      component: DateRangeModalComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
