/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Environment {
  production: boolean;
  occBaseUrl: string;
  occApiPrefix: string;
  b2b: boolean;
  cds: boolean;
  cdc: boolean;
  cpq: boolean;
  digitalPayments: boolean;
  epdVisualization: boolean;
  s4om: boolean;
  segmentRefs: boolean;
  requestedDeliveryDate: boolean;
  pdfInvoices: boolean;
  myAccountV2: boolean;
}
