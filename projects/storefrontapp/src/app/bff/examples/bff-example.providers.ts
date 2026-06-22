/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { ROUTES } from '@angular/router';

export const bffExampleProviders: Provider[] = [
  {
    provide: ROUTES,
    multi: true,
    useValue: [
      {
        path: 'bff-say-hello',
        loadComponent: () =>
          import('./say-hello.component').then((m) => m.SayHelloComponent),
      },
    ],
  },
];
