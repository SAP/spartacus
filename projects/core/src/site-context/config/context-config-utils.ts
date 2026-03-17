/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BASE_SITE_CONTEXT_ID } from '../providers/context-ids';
import { SiteContextConfig } from './site-context-config';

/**
 * Helper function for safely getting context parameter config
 *
 * @param config
 * @param parameter
 */
export function getContextParameterValues(
  config: SiteContextConfig,
  parameter: string
): string[] {
  return (config.context && config.context[parameter]) || [];
}

/**
 * Helper function for calculating default value for context parameter from config
 *
 * @param config
 * @param parameter
 */
export function getContextParameterDefault(
  config: SiteContextConfig,
  parameter: string
): string | undefined {
  const param = getContextParameterValues(config, parameter);
  return param?.[0];
}

/**
 * OCC backend uses "storefront" while Spartacus uses "baseSite" for the same concept.
 */
const STOREFRONT_PARAM = 'storefront';

/**
 * Normalizes URL encoding parameters by mapping OCC "storefront" to Spartacus "baseSite".
 *
 * OCC backend returns `urlEncodingAttributes` with "storefront" parameter,
 * but Spartacus internally uses "baseSite" identifier.
 *
 * @param params - URL encoding parameters from OCC (e.g., ['storefront', 'language', 'currency'])
 * @returns Normalized parameters (e.g., ['baseSite', 'language', 'currency'])
 */
export function normalizeUrlEncodingParams(
  params: string[] | undefined
): string[] {
  return (params || []).map((param) =>
    param === STOREFRONT_PARAM ? BASE_SITE_CONTEXT_ID : param
  );
}

