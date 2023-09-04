/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';
import { RenderingStrategy } from './ssr-optimization-options';
import { RenderingStrategyResolverOptions } from './rendering-strategy-resolver-options';

const hasExcludedParams = (
  request: Request,
  excludedParams: string[] | undefined
): boolean => {
  const params: string[] = request.query
    ? Object.getOwnPropertyNames(request.query)
    : [];

  if (!excludedParams) {
    return false;
  }

  return excludedParams.some((excludedParam: string) =>
    params.some((param: string): boolean => excludedParam === param)
  );
};

const hasExcludedUrl = (
  request: Request,
  excludedUrls: string[] | undefined
) => {
  return request.url && excludedUrls
    ? excludedUrls.some((url) => request.url.search(url) > -1)
    : false;
};

const shouldFallbackToCsr = (
  request: Request,
  { excludedParams, excludedUrls }: RenderingStrategyResolverOptions
) => {
  return (
    hasExcludedParams(request, excludedParams) ||
    hasExcludedUrl(request, excludedUrls)
  );
};

export const defaultRenderingStrategyResolver =
  (options: RenderingStrategyResolverOptions) =>
  (request: Request): RenderingStrategy => {
    return shouldFallbackToCsr(request, options)
      ? RenderingStrategy.ALWAYS_CSR
      : RenderingStrategy.DEFAULT;
  };
