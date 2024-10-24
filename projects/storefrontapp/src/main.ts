/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  // SPIKE NEW - break long task in the main thread
  setTimeout(() => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      /* eslint-disable-next-line no-console
    --
    It's just an example application file. This message is not crucial
    to be logged using any special logger. Moreover, we don't have
    any special logger available in this context. */
      .catch((err) => console.error(err));
  }, 0);
}

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
