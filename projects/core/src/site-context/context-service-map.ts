import { Type } from '@angular/core';
import { SiteContext } from './facade/site-context.interface';

export abstract class ContextServiceMap {
  [context: string]: Type<SiteContext<any>>;
}

export const LANGUAGE_CONTEXT_ID = 'language';
export const CURRENCY_CONTEXT_ID = 'currency';
