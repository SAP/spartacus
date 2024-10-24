/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  cdp: buildProcess.env.CX_CDP,
  cpq: buildProcess.env.CX_CPQ,
  digitalPayments: buildProcess.env.CX_DIGITAL_PAYMENTS,
  epdVisualization: buildProcess.env.CX_EPD_VISUALIZATION,
  s4om: buildProcess.env.CX_S4OM,
  opf: buildProcess.env.CX_OPF,
  omf: buildProcess.env.CX_OMF,
  segmentRefs: buildProcess.env.CX_SEGMENT_REFS,
  opps: buildProcess.env.CX_OPPS,
  requestedDeliveryDate: buildProcess.env.CX_REQUESTED_DELIVERY_DATE,
  estimatedDeliveryDate: buildProcess.env.CX_ESTIMATED_DELIVERY_DATE,
  pdfInvoices: buildProcess.env.CX_PDF_INVOICES,
  myAccountV2: buildProcess.env.CX_MY_ACCOUNT_V2 ?? false,
  s4Service: buildProcess.env.CX_S4_SERVICE,
};
