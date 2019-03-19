import { Provider } from '@angular/core';
import { Adapter } from './adapter';
import { PageDataFallbackAdapter } from './fallback-pagedata.adapter';

export const adapters: Provider[] = [
  {
    provide: Adapter,
    useClass: PageDataFallbackAdapter,
    multi: true
  }
];

export * from './adapter';
export * from './fallback-pagedata.adapter';
