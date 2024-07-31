/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

declare var buildProcess: BuildProcess;

interface BuildProcess {
  env: Env;
}

interface Env {
  CX_BASE_URL: string;
  CX_CDS: boolean;
  CX_CDC: boolean;
  CX_CDP: boolean;
  CX_B2B: boolean;
  CX_CPQ: boolean;
  CX_DIGITAL_PAYMENTS: boolean;
  CX_EPD_VISUALIZATION: boolean;
  CX_S4OM: boolean;
  CX_OPF: boolean;
  CX_SEGMENT_REFS: boolean;
  CX_OPPS: boolean;
  CX_REQUESTED_DELIVERY_DATE: boolean;
  CX_PDF_INVOICES: boolean;
  CX_MY_ACCOUNT_V2: boolean;
  CX_ESTIMATED_DELIVERY_DATE: boolean;
  CX_S4_SERVICE: boolean;
}
