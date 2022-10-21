/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationInfo } from '@spartacus/product-configurator/common';
import { Comment } from './commerce-quotes.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    comments?: Comment[];
    configurationInfos?: ConfigurationInfo[];
  }
}
