/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/cart/base/root';
import { ScheduleLine } from './schedule-line.model';

import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    S4OM_ORDER_ATTACHMENTS = 'S4OM_ORDER_ATTACHMENTS',
  }
}

(LAUNCH_CALLER as any)['S4OM_ORDER_ATTACHMENTS'] = 'S4OM_ORDER_ATTACHMENTS';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    scheduleLines?: ScheduleLine[];
  }
}
