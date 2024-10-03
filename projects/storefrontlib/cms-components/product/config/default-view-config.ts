/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewConfig } from '../../../shared/config/view-config';

export const defaultViewConfig: ViewConfig = {
  view: {
    defaultPageSize: 12,
    infiniteScroll: {
      active: false,
      productLimit: 0,
      showMoreButton: false,
    },
  },
};
