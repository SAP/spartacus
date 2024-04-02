/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TmsCollectorConfig, TmsConfig } from '@spartacus/tracking/tms/core';
import { GtmCollectorService } from '../services/gtm-collector.service';

export interface GtmCollectorConfig extends TmsCollectorConfig {
  gtmId?: string;
}

declare module '@spartacus/tracking/tms/core' {
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
