/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccCartConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        /* eslint-disable max-len */
        carts:
          'users/${userId}/carts?fields=FULL',
        cart: 'users/${userId}/carts/${cartId}?fields=FULL',
        createCart:
          'users/${userId}/carts?fields=FULL',
        addEntries: 'users/${userId}/carts/${cartId}/entries',
        updateEntries: 'users/${userId}/carts/${cartId}/entries/${entryNumber}',
        removeEntries: 'users/${userId}/carts/${cartId}/entries/${entryNumber}',
        addEmail: 'users/${userId}/carts/${cartId}/email',
        deleteCart: 'users/${userId}/carts/${cartId}',
        cartVoucher: 'users/${userId}/carts/${cartId}/vouchers',
        saveCart:
          '/users/${userId}/carts/${cartId}/save?saveCartName=${saveCartName}&saveCartDescription=${saveCartDescription}',
        validate: 'users/${userId}/carts/${cartId}/validate?fields=DEFAULT',
        /* eslint-enable */
      },
    },
  },
};
