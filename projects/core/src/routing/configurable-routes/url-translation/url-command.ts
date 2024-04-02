/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UrlCommandRoute {
  cxRoute?: string;
  params?: { [param: string]: any };
}

export type UrlCommand = UrlCommandRoute | any;

export type UrlCommands = UrlCommand | UrlCommand[];
