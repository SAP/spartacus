/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Environment } from './models/environment.model';

export const environment: Environment = {
  production: true,
  occBaseUrl: buildProcess.env.CX_BASE_URL,
  occApiPrefix: '/occ/v2/',
  cds: buildProcess.env.CX_CDS,
  b2b: buildProcess.env.CX_B2B,
  cdc: buildProcess.env.CX_CDC,
  cpq: buildProcess.env.CX_CPQ,
  digitalPayments: buildProcess.env.CX_DIGITAL_PAYMENTS,
  epdVisualization: buildProcess.env.CX_EPD_VISUALIZATION,
  s4om: buildProcess.env.CX_S4OM,
  segmentRefs: buildProcess.env.CX_SEGMENT_REFS,
  requestedDeliveryDate: buildProcess.env.CX_REQUESTED_DELIVERY_DATE,
};
