/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 *
 * Authorization data required for communicating with CPQ
 *
 * @deprecated since 2211.25. Not needed for commerce based CPQ orchestration (which is the default communication flavour).
 * Refer to configuration setting ConfiguratorCoreConfig.productConfigurator.cpqOverOcc = true.
 * The other flavour (performing direct calls from composable storefront to CPQ) is technically no longer supported.
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
