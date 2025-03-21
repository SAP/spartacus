/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// SPIKE NEW - defer initial bootstrap to next macro task
setTimeout(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule, {
      ngZoneEventCoalescing: true,
    })
    .catch((err) => console.error(err));
}, 0);
