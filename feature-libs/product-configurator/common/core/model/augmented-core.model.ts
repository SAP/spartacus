/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationInfo, StatusSummary } from './common-configurator.model';
declare module '@spartacus/core' {
  interface Product {
    configurable?: boolean;
    configuratorType?: string;
  }
}
declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    statusSummaryList?: StatusSummary[];
    configurationInfos?: ConfigurationInfo[];
  }
}
