/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { isDevMode } from '@angular/core';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware for handlingChrome DevTools endpoint in development mode.
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
