/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isDevMode } from '@angular/core';
import { Request, Response, NextFunction } from 'express';
/**
 * Middleware for handling Chrome DevTools endpoint in development mode.
 *
 * Allows void unwanted warnings in the console before we can apply the official solution provided by Angular.
 *
 * Decided to keep it only private as part of internal utilities:
 * - It solves the problem superficially, without caching, and is only a temporary measure.
 * - Since the unwanted logs are caused by Chrome devtools, this affects every application that uses SSR,
 *   not just those based on Spartacus.
 * In connection with the above there is no reason to maintain this middleware.
 *
 * @returns Express middleware function.
 *
 * TODO: after implementing a modern Angular SSR setup, this middleware should be removed due to ootb support:
 * https://github.com/angular/angular-cli/blob/main/packages/angular/build/src/tools/vite/plugins/setup-middlewares-plugin.ts#L106
 */
export function getChromeDevtoolsExpressMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      isDevMode() &&
      req.path === '/.well-known/appspecific/com.chrome.devtools.json'
    ) {
      const root = process.cwd();
      const uuid = crypto.randomUUID();

      res.json({
        workspace: { root, uuid },
      });
    } else {
      next();
    }
  };
}
