/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultBaseSiteResolver } from './default-base-site-resolver';
import { BaseSiteResolver, BaseSiteResolverOptions } from './base-site-resolver';

let resolver: BaseSiteResolver | undefined;

/**
 * Builds a {@link DefaultBaseSiteResolver} from `options` and stores it as the
 * process-wide singleton used by {@link getConfiguredBaseSiteResolver}.
 */
export function configureBaseSiteResolver(
  options: BaseSiteResolverOptions
): void {
  resolver = new DefaultBaseSiteResolver(options);
}

/**
 * Returns the configured {@link BaseSiteResolver} singleton.
 * @throws {Error} if {@link configureBaseSiteResolver} has not been called yet.
 */
export function getConfiguredBaseSiteResolver(): BaseSiteResolver {
  if (!resolver) {
    throw new Error(
      'No base-site resolver has been configured. Call configureBaseSiteResolver() before using the resolver.'
    );
  }
  return resolver;
}

/**
 * Clears the process-wide singleton. Intended for use in tests only.
 */
export function resetBaseSiteResolver(): void {
  resolver = undefined;
}
