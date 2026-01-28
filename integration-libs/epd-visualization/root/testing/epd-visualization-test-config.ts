/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EpdVisualizationConfig } from '../config/epd-visualization-config';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export function getTestConfig(): EpdVisualizationConfig {
  return {
    epdVisualization: {
      apis: {
        baseUrl: 'https://fake.visualization.application.domain.sap',
      },
      ui5: {
        bootstrapUrl: 'https://ui5.sap.com/1.120/resources/sap-ui-core.js',
      },
    },
  };
}
