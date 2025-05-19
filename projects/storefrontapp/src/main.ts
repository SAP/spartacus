/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MyStorefrontComponent } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  // platformBrowserDynamic()
  //   .bootstrapModule(AppModule)
  //   /* eslint-disable-next-line no-console
  //   --
  //   It's just an example application file. This message is not crucial
  //   to be logged using any special logger. Moreover, we don't have
  //   any special logger available in this context. */
  //   .catch((err) => console.error(err));

  bootstrapApplication(MyStorefrontComponent);
}

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
