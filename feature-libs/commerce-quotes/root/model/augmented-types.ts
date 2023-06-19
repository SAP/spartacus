/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationInfo } from '@spartacus/product-configurator/common';
import '@spartacus/storefront';

import { Comment } from './quote.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    comments?: Comment[];
    configurationInfos?: ConfigurationInfo[];
  }
}

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    REQUEST_QUOTE = 'REQUEST_QUOTE',
    REQUEST_CONFIRMATION = 'REQUEST_CONFIRMATION',
  }
}
