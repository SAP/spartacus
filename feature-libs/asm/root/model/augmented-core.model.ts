/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    ASM_CUSTOMER_LIST = 'ASM_CUSTOMER_LIST',
    ASM_BIND_CART = 'ASM_BIND_CART',
    ASM_SAVE_CART = 'ASM_SAVE_CART',
    ASM_SWITCH_CUSTOMER = 'ASM_SWITCH_CUSTOMER',
    ASM_CREATE_CUSTOMER_FORM = 'ASM_CREATE_CUSTOMER_FORM',
  }
}
