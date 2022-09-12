/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationInfo, StatusSummary } from './common-configurator.model';
declare module '@commerce-storefront-toolset/core' {
  interface Product {
    configurable?: boolean;
    configuratorType?: string;
  }
}
declare module '@commerce-storefront-toolset/cart/base/root' {
  interface OrderEntry {
    statusSummaryList?: StatusSummary[];
    configurationInfos?: ConfigurationInfo[];
  }
}
