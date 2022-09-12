/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TmsCollectorConfig, TmsConfig } from '@commerce-storefront-toolset/tracking/tms/core';
import { GtmCollectorService } from '../services/gtm-collector.service';

export interface GtmCollectorConfig extends TmsCollectorConfig {
  gtmId?: string;
}

declare module '@commerce-storefront-toolset/tracking/tms/core' {
  interface TmsCollectors {
    gtm?: GtmCollectorConfig;
  }
}

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tagManager: {
    gtm: {
      collector: GtmCollectorService,
    },
  },
};
