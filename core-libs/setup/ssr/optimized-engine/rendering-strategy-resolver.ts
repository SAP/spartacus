/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';
import {
  RenderingBlocked,
  RenderingStrategy,
} from './ssr-optimization-options';

const hasExcludedParams = (
  request: Request,
  renderingBlocked: RenderingBlocked
) => {
  const params = request.query ? Object.getOwnPropertyNames(request.query) : [];

  if (!renderingBlocked?.params) {
    return false;
  }

  return renderingBlocked.params.some((excludedParam) =>
    params.some((param) => excludedParam === param)
  );
};

const hasExcludedUrl = (
  request: Request,
  renderingBlocked: RenderingBlocked
) => {
  return request.url && renderingBlocked?.urls
    ? renderingBlocked.urls.some((url) => request.url.search(url) > -1)
    : false;
};

const shouldFallbackToCsr = (
  request: Request,
  renderingBlocked: RenderingBlocked
) => {
  return (
    hasExcludedParams(request, renderingBlocked) ||
    hasExcludedUrl(request, renderingBlocked)
  );
};

export const defaultRenderingStrategyResolver =
  (renderingBlocked: RenderingBlocked) =>
  (request: Request): RenderingStrategy => {
    return shouldFallbackToCsr(request, renderingBlocked)
      ? RenderingStrategy.ALWAYS_CSR
      : RenderingStrategy.DEFAULT;
  };
