/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { getRuntimeEnvironment, RUNTIME_ENVIRONMENT } from '@spartacus/setup';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

getRuntimeEnvironment()
  .then(({ runtimeEnvironment }) => {
    return bootstrapApplication(AppComponent, {
      providers: [
        { provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment },
        ...appConfig.providers,
      ],
    });
  })
  /* eslint-disable-next-line no-console
  --
  It's just an example application file. This message is not crucial
  to be logged using any special logger. Moreover, we don't have
  any special logger available in this context. */
  .catch((err) => console.error(err));

