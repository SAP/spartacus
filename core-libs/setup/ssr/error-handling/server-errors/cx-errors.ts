/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 *  Error codes used to denote a particular type of error appearing in the application during SSR.
 *  We provides two default error codes:
 *  - UnknownServerError SR0001: Used when the error is not recognized by the application.
 *  - CmsPageNotFoundServerError SR0002: Used when the requested CMS page is not found.
 * */
export enum CxError {
  UnknownServerError = 'SR0001',
  CmsPageNotFoundServerError = 'SR0002',
}
