/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, InjectionToken } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';

/**
 * The absolute directory on the server pointing to the `/dist` folder of the application.
 *
 * It can be used for example to determine the path to the application's assets on the server,
 * so to load them directly from the file system (e.g. using Node's `fs` package).
 */
export const SERVER_APP_DIST_FOLDER = new InjectionToken<string>(
  'BROWSER_APP_DIST_FOLDER',
  { providedIn: 'root', factory: expressServerAppDistFolderFactory }
);

/**
 * Returns the absolute directory on the server pointing to the `/dist` folder of the application.
 * It's retrieved from the `views` setting of the ExpressJS server instance
 *
 * Note: it assumes that the setting `views` has been set for the ExpressJS server,
 *       e.g. `server.set('views', distFolder)`, likely in the file `server.ts`.
 */
function expressServerAppDistFolderFactory() {
  const server = inject(REQUEST).app;
  const distFolderKey = 'views';

  //
  return server.get(distFolderKey);
}

// SPIKE TODO: provide a way to configure the dist folder on the server for prerendering
