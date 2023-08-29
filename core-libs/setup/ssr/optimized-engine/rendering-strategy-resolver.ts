/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from "express";
import { RenderingStrategy } from "./ssr-optimization-options";

const hasBlacklistedParams = (request: Request): boolean => {
  const blacklistedParams = ['gclid', 'asm'];
  const params = Object.getOwnPropertyNames(request.query);

  return blacklistedParams.some((blacklistedParam: string) =>
    params.some((param: string) => blacklistedParam === param),
  );
};

const hasBlacklistedUrl = (request: Request): boolean => {
  const blacklistedUrls = ['/checkout'];

  return blacklistedUrls.some((url: string) => request.url.search(url) > -1);
};

const shouldFallbackToCsr = (request: Request): boolean => {
  return hasBlacklistedParams(request) || hasBlacklistedUrl(request);
};

export const defaultRenderingStrategyResolver  = (request: Request): RenderingStrategy => {
  return shouldFallbackToCsr(request) ? RenderingStrategy.ALWAYS_CSR : RenderingStrategy.DEFAULT;
};
