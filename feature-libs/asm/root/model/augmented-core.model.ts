/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    ASM_CUSTOMER_LIST = 'ASM_CUSTOMER_LIST',
    ASM_BIND_CART = 'ASM_BIND_CART',
    ASM_SAVE_CART = 'ASM_SAVE_CART',
    ASM_SWITCH_CUSTOMER = 'ASM_SWITCH_CUSTOMER',
    ASM_CREATE_CUSTOMER_FORM = 'ASM_CREATE_CUSTOMER_FORM',
  }
}

(LAUNCH_CALLER as any)['ASM_CUSTOMER_LIST'] = 'ASM_CUSTOMER_LIST';
(LAUNCH_CALLER as any)['ASM_BIND_CART'] = 'ASM_BIND_CART';
(LAUNCH_CALLER as any)['ASM_SAVE_CART'] = 'ASM_SAVE_CART';
(LAUNCH_CALLER as any)['ASM_SWITCH_CUSTOMER'] = 'ASM_SWITCH_CUSTOMER';
(LAUNCH_CALLER as any)['ASM_CREATE_CUSTOMER_FORM'] = 'ASM_CREATE_CUSTOMER_FORM';
