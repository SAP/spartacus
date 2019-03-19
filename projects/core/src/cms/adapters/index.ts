import { Provider } from '@angular/core';
import { Adapter } from './adapter';
// import { PageDataFallbackAdapter } from './fallback-pagedata.adapter';
import { OccAdapter } from './occ.adapter';

export const adapters: Provider[] = [
  // {
  //   provide: Adapter,
  //   useClass: PageDataFallbackAdapter,
  //   multi: true
  // },
  {
    provide: Adapter,
    useClass: OccAdapter,
    multi: true
  }
];

export * from './adapter';
export * from './fallback-pagedata.adapter';
