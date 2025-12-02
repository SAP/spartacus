/*
 * Copyright (C) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isDevMode } from '@angular/core';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware for handling Chrome DevTools endpoint in development mode.
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
