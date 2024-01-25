/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 *
 * Authorization data required for communicating with CPQ
 */
export interface CpqAccessData {
  /**
   * CPQ Access token
   */
  accessToken: string;
  /**
   * Token expiration time in milliseconds
   */
  accessTokenExpirationTime: number;
  /**
   * CPQ endpoint url
   */
  endpoint: string;
}
