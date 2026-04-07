/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OriginMapService {
  config = inject(Config);

  contextParameterName = 'origin';

  loginOrigin = [
    // 'localhost:4200',
    'login.local:4200',
  ];

  origins: Record<string, string> = {
    'electronics.de': 'https://electronics-spa.x',
    de: 'https://electronics-spa.x',
    es: 'https://apparel-uk-spa.x',
    pd: 'https://powertools-spa.x',
  };

  translateContext(context: string | null | undefined) {
    return context ? this.origins[context] : undefined;
  }
}
