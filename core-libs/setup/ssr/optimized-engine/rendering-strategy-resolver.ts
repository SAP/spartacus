import { Request } from 'express';
import { RenderingStrategy } from './ssr-optimization-options';

const hasExcludedParams = (request: Request): boolean => {
  const excludedParams = ['gclid', 'asm'];
  const params = request.query ? Object.getOwnPropertyNames(request.query) : [];

  return excludedParams.some((excludedParam: string) =>
    params.some((param: string) => excludedParam === param)
  );
};

const hasExcludedUrl = (request: Request): boolean => {
  const excludedUrls = ['/checkout'];

  return request.url
    ? excludedUrls.some((url: string) => request.url.search(url) > -1)
    : false;
};

const shouldFallbackToCsr = (request: Request): boolean => {
  return hasExcludedParams(request) || hasExcludedUrl(request);
};

export const defaultRenderingStrategyResolver = (
  request: Request
): RenderingStrategy => {
  return shouldFallbackToCsr(request)
    ? RenderingStrategy.ALWAYS_CSR
    : RenderingStrategy.DEFAULT;
};
