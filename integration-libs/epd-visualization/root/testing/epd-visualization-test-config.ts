/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EpdVisualizationConfig } from '../config/epd-visualization-config';

export function getTestConfig(): EpdVisualizationConfig {
  return {
    epdVisualization: {
      apis: {
        baseUrl:
          'https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com',
      },
      ui5: {
        bootstrapUrl: 'https://ui5.sap.com/1.108/resources/sap-ui-core.js',
      },
    },
  };
}
