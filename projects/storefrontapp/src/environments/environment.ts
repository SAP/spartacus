/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
import { Environment } from './models/environment.model';

export const environment: Environment = {
  production: false,
  occBaseUrl: buildProcess.env.CX_BASE_URL,
  occApiPrefix: '/occ/v2/',
  cds: buildProcess.env.CX_CDS ?? false,
  b2b: buildProcess.env.CX_B2B ?? false,
  cdc: buildProcess.env.CX_CDC ?? false,
  cdp: buildProcess.env.CX_CDP ?? false,
  cpq: buildProcess.env.CX_CPQ ?? false,
  digitalPayments: buildProcess.env.CX_DIGITAL_PAYMENTS ?? false,
  epdVisualization: buildProcess.env.CX_EPD_VISUALIZATION ?? false,
  s4om: buildProcess.env.CX_S4OM ?? false,
  segmentRefs: buildProcess.env.CX_SEGMENT_REFS ?? false,
  opps: buildProcess.env.CX_OPPS ?? false,
  requestedDeliveryDate: buildProcess.env.CX_REQUESTED_DELIVERY_DATE ?? false,
  estimatedDeliveryDate: buildProcess.env.CX_ESTIMATED_DELIVERY_DATE ?? false,
  pdfInvoices: buildProcess.env.CX_PDF_INVOICES ?? false,
  myAccountV2: buildProcess.env.CX_MY_ACCOUNT_V2 ?? false,
};
