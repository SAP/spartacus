/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RenderingStrategyResolverOptions {
  excludedUrls?: string[];
  excludedParams?: string[];
}

export const defaultRenderingStrategyResolverOptions: RenderingStrategyResolverOptions =
  {
    excludedUrls: ['checkout', 'my-account', 'cx-preview'],
    excludedParams: ['asm'],
  };
