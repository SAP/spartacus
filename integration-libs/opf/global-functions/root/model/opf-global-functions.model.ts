import { ViewContainerRef } from '@angular/core';
import { KeyValuePair } from '@spartacus/opf/base/root';

export enum GlobalFunctionsDomain {
  CHECKOUT = 'checkout',
  GLOBAL = 'global',
  REDIRECT = 'redirect',
}

export interface GlobalFunctionsInput {
  paymentSessionId: string;
  vcr?: ViewContainerRef;
  paramsMap?: Array<KeyValuePair>;
  domain: GlobalFunctionsDomain;
}
