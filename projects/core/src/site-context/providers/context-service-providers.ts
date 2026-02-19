/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, Provider } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { Config } from '../../config/config-tokens';
import { BaseSiteService } from '../facade/base-site.service';
import { CurrencyService } from '../facade/currency.service';
import { LanguageService } from '../facade/language.service';

export function initializeContext(
  configInit: ConfigInitializerService
): () => Promise<Config> {
  return () => {
    return lastValueFrom(configInit.getStable('context'));
  };
}

export const contextServiceProviders: Provider[] = [
  BaseSiteService,
  LanguageService,
  CurrencyService,
  {
    provide: APP_INITIALIZER,
    useFactory: initializeContext,
    deps: [ConfigInitializerService],
    multi: true,
  },
];
