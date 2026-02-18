/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider, Type } from '@angular/core';
import { BaseSiteService } from '../facade/base-site.service';
import { CurrencyService } from '../facade/currency.service';
import { LanguageService } from '../facade/language.service';
import { SiteContext } from '../facade/site-context.interface';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
  CUSTOM
} from './context-ids';
import { CustomContextService } from '../services/custom-context-service';

export abstract class ContextServiceMap {
  [context: string]: Type<SiteContext<any>>;
}

export function serviceMapFactory() {
  return {
    [LANGUAGE_CONTEXT_ID]: LanguageService,
    [CURRENCY_CONTEXT_ID]: CurrencyService,
    [BASE_SITE_CONTEXT_ID]: BaseSiteService,
    [CUSTOM]: CustomContextService,
  };
}

export const contextServiceMapProvider: Provider = {
  provide: ContextServiceMap,
  useFactory: serviceMapFactory,
};
